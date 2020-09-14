using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Security.AccessControl;
using System.Threading.Tasks;
using AutoMapper;
using CsvHelper;
using EveRaiders.Data;
using EveRaiders.Data.Enums;
using EveRaiders.Data.Models;
using EveRaiders.Data.Models.CsvModels;
using EveRaiders.Web.Api.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace EveRaiders.Web.Api.Controllers
{
    //[Authorize(Policy = "Members")]
    [Route("planets")]
    [ApiController]
    public class PlanetsController : ControllerBase
    {
        private readonly EveRaidersContext _db;
        private readonly IMapper _mapper;

        public PlanetsController(EveRaidersContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        // GET: api/<PlanetsController>
        [Produces("application/json")]
        [HttpGet]
        public async Task<IActionResult> Get(PlanetResourceTypes? resourceType,
            ResourceRichnessTypes? richness, string planetName, string system, string constellation, string region, PlanetTypes? planetType, int limit = 200)
        {
            var planets = _db.Planets
                .Include(i => i.Resources)
                .Include(i => i.System)
                .ThenInclude(i => i.Constellation)
                .ThenInclude(i => i.Region).AsQueryable();

            if (!string.IsNullOrEmpty(planetName))
                planets = planets.Where(s => s.Name.Contains(planetName));

            if (!string.IsNullOrEmpty(system))
                planets = planets.Where(s => s.System.Name.Contains(system));

            if (!string.IsNullOrEmpty(constellation))
                planets = planets.Where(s => s.System.Constellation.Name.Contains(constellation));

            if (!string.IsNullOrEmpty(region))
                planets = planets.Where(s => s.System.Constellation.Region.Name.Contains(region));

            if (planetType.HasValue)
                planets = planets.Where(s => s.Type == planetType);

            if (richness.HasValue && resourceType.HasValue)
            {
                planets = planets.Where(s => s.Resources.Any(c => c.Richness == richness && c.Type == resourceType));
            }
            else
            {
                if (resourceType.HasValue)
                    planets = planets.Where(s => s.Resources.Any(c => c.Type == resourceType));

                if (richness.HasValue)
                    planets = planets.Where(s => s.Resources.Any(c => c.Richness == richness));
            }


            if (limit > 200)
                limit = 200;

            var planetsList = await planets.Take(limit).ToListAsync();

            var planetsResult = _mapper.Map<List<PlanetViewModel>>(planetsList);

            return Ok(planetsResult.OrderBy(s => s.DistanceFromBase));
        }

        [Produces("application/json")]
        [HttpGet("resources/{resourceType}/{richnessType}")]
        public IActionResult GetPlanetsByResourceAndRichness(string resourceType, string richnessType, int? regionId, string? homeSystemName)
        {
            string rootSystemName = homeSystemName ?? "CZDJ-1";
            var systemNameMap = new Dictionary<string, long>();

            systemNameMap = CreateSystemNameMap();

            if (!systemNameMap.ContainsKey(homeSystemName))
            {
                return NotFound();
            }

            if (Enum.TryParse(resourceType, out PlanetResourceTypes resource) && Enum.TryParse(richnessType, out ResourceRichnessTypes richness))
            {
                var resources = _db.PlanetResources.Include(s => s.Planet).ThenInclude(s => s.System).ThenInclude(s => s.Constellation)
                    .ThenInclude(s => s.Region)
                    .Where(s => s.Richness == richness && s.Type == resource);

                if (regionId.HasValue && regionId != 0)
                    resources = resources.Where(s => s.Planet.System.Constellation.Region.Id == regionId.Value);

                var systemsDict = new Dictionary<string, List<string>>();
                var systemsGraph = new Dictionary<long, SystemGraphNode>();

                int distance = 1;

                Dictionary<SystemGraphNode, bool> traveled = new Dictionary<SystemGraphNode, bool>();


                CreateGraphs(systemsDict, systemsGraph);

                BFSLookForSystems(systemNameMap[rootSystemName], systemsGraph, distance, traveled);

                var resourceResult = _mapper.Map<List<ResourceRichnessViewModel>>(resources.OrderBy(s => s.Planet.System.DistanceFromBase).ThenByDescending(s => s.Output).ToList());

                var resourcesDict = resources.ToLookup(x => x.Planet.Name, y => y.Planet.System.EveOnlineId).ToDictionary(x => x.Key, y => y.First()); //This only needs to be here cause there's no ID in the view model.

                //Replacing distances for now.
                foreach (var res in resourceResult)
                {
                    res.DistanceFromBase = systemsGraph[resourcesDict[res.PlanetName]].Distance;
                }

                resourceResult = resourceResult.OrderBy(s => s.DistanceFromBase).ThenByDescending(s => s.Output).ToList();

                return Ok(resourceResult);
            }
            else
            {
                return NotFound();
            }
        }

        //Move this helper function somewhere else?
        private static void BFSLookForSystems(long rootSystemId, Dictionary<long, SystemGraphNode> systemsGraph, int distance, Dictionary<SystemGraphNode, bool> traveled)
        {
            Queue<SystemGraphNode> bfsQueue = new Queue<SystemGraphNode>();

            bfsQueue.Enqueue(systemsGraph[rootSystemId]);
            traveled[systemsGraph[rootSystemId]] = true;

            while (bfsQueue.Count != 0)
            {

                int size = bfsQueue.Count;

                for (int i = 0; i < size; i++)
                {
                    var current = bfsQueue.Dequeue();


                    foreach (var neighbor in current.Neighbors)
                    {
                        if (!traveled.ContainsKey(neighbor))
                        {
                            traveled[neighbor] = false;
                        }
                        if (!traveled[neighbor])
                        {
                            neighbor.Distance = distance;
                            bfsQueue.Enqueue(neighbor);
                            traveled[neighbor] = true;
                        }
                    }
                }
                distance++;
            }
        }

        //Move this helper function somewhere else?
        private static void CreateGraphs(Dictionary<string, List<string>> systemsDict, Dictionary<long, SystemGraphNode> systemsGraph)
        {
            using (var reader = new StreamReader("NewEdenGraph.csv"))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                csv.Configuration.HasHeaderRecord = true;
                csv.Configuration.RegisterClassMap<CsvImportMap>();
                var rows = csv.GetRecords<CsvImportModel>();
                systemsDict = rows.ToDictionary(x => x.Id, x => x.Neighbors);
            }

            //Create a dictionary with key of systemId and value of the graphNode
            foreach (var system in systemsDict)
            {
                systemsGraph[Convert.ToInt32(system.Key)] = new SystemGraphNode(system.Key);
            }


            foreach (var node in systemsGraph)
            {
                foreach (var neighbor in systemsDict[node.Key.ToString()])
                {
                    if (!string.IsNullOrEmpty(neighbor))
                    {
                        node.Value.Neighbors.Add(systemsGraph[Convert.ToInt32(neighbor)]);
                    }
                }
            }
        }

        private static Dictionary<string, long> CreateSystemNameMap()
        {
            var systemsMap = new Dictionary<string, long>();
            using (var reader = new StreamReader("SystemNamesDict.csv"))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                csv.Configuration.PrepareHeaderForMatch = (string header, int index) => header.ToLower();
                var records = csv.GetRecords<SystemViewModel>();
                systemsMap = records.ToDictionary(x => x.Name, x => x.Id); //Reverse, for front-end lookup
            }

            return systemsMap;
        }

        [AllowAnonymous]
        [Produces("application/json")]
        [HttpGet("filters")]
        public IActionResult GetFilters()
        {
            var filters = new FilterViewModel
            {
                Types = Enum.GetNames(typeof(PlanetResourceTypes)).ToList(),
                Richness = Enum.GetNames(typeof(ResourceRichnessTypes)).ToList(),
                PlanetTypes = Enum.GetNames(typeof(PlanetTypes)).ToList(),
                Systems = _db.Systems.AsQueryable().Select(x => new SystemViewModel() { Id = x.Id, Name = x.Name }).ToList(),
                Regions = _db.Regions.AsQueryable().Select(x => new RegionViewModel() { Id = x.Id, Name = x.Name }).ToList(),
                Constellations = _db.Constellations.AsQueryable().Select(x => new ConstellationViewModel() { Id = x.Id, Name = x.Name }).ToList()
            };
            return Ok(filters);
        }
    }
}