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
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Blobs.Specialized;
using Microsoft.Extensions.Configuration;

namespace EveRaiders.Web.Api.Controllers
{
    //[Authorize(Policy = "Members")]
    [Route("planets")]
    [ApiController]
    public class PlanetsController : ControllerBase
    {
        private readonly EveRaidersContext _db;
        private readonly IMapper _mapper;

        public PlanetsController(EveRaidersContext db, IMapper mapper, IConfiguration configuration)
        {
            _db = db;
            _mapper = mapper;
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }

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
            try
            {
                string rootSystemName = homeSystemName ?? "CZDJ-1";
                var systemNameMap = new Dictionary<string, long>();

                systemNameMap = CreateNodeMapFromBlob().Result;

                if (!systemNameMap.ContainsKey(rootSystemName))
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

                    var systemsGraph = new Dictionary<string, List<string>>();
                    var systemsDict = new Dictionary<long, SystemGraphNode>();

                    int distance = 1;

                    Dictionary<SystemGraphNode, bool> traveled = new Dictionary<SystemGraphNode, bool>();

                    systemsGraph = CreateInitialGraphFromBlob().Result;
                    systemsDict = PopulateGraph(systemsGraph);

                    BFSLookForSystems(systemNameMap[rootSystemName], systemsDict, distance, traveled);

                    var resourceResult = _mapper.Map<List<ResourceRichnessViewModel>>(resources.OrderBy(s => s.Planet.System.DistanceFromBase).ThenByDescending(s => s.Output).ToList());

                    var resourcesDict = resources.ToLookup(x => x.Planet.Name, y => y.Planet.System.EveOnlineId).ToDictionary(x => x.Key, y => y.First()); //This only needs to be here cause there's no ID in the view model.

                    //Replacing distances for now.
                    foreach (var res in resourceResult)
                    {
                        res.DistanceFromBase = systemsDict[resourcesDict[res.PlanetName]].Distance;
                    }

                    resourceResult = resourceResult.OrderBy(s => s.DistanceFromBase).ThenByDescending(s => s.Output).ToList();

                    return Ok(resourceResult);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception e) 
            {
                return Problem(e.Message);
            }
        }

        private async Task<Dictionary<string, List<string>>> CreateInitialGraphFromBlob()
        {
            Dictionary<string, List<string>> SystemGraphNode;
            BlobClient blobClient = GetFileFromBlob("NewEdenGraph.csv");
            BlobDownloadInfo download = await blobClient.DownloadAsync();

            using (var reader = new StreamReader(download.Content))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                csv.Configuration.HasHeaderRecord = true;
                csv.Configuration.RegisterClassMap<CsvImportMap>();
                var rows = csv.GetRecords<CsvImportModel>();
                SystemGraphNode = rows.ToDictionary(x => x.Id, x => x.Neighbors);
            }

            return SystemGraphNode;
        }

        private async Task<Dictionary<string, long>> CreateNodeMapFromBlob()
        {

            var systemsMap = new Dictionary<string, long>();
            BlobClient blobClient = GetFileFromBlob("SystemNamesDict.csv");
            BlobDownloadInfo download = await blobClient.DownloadAsync();

            using (var reader = new StreamReader(download.Content))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                csv.Configuration.PrepareHeaderForMatch = (string header, int index) => header.ToLower();
                var records = csv.GetRecords<SystemViewModel>();
                systemsMap = records.ToDictionary(x => x.Name, x => x.Id); //Reverse, for front-end lookup
            }

            return systemsMap;
        }

        private BlobClient GetFileFromBlob(string fileName)
        {
            BlobServiceClient blobServiceClient = new BlobServiceClient(Configuration["ConnectionStrings:AzureBlobConnection"]);

            BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient("everaidersblob");
            return containerClient.GetBlobClient(fileName);
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
        private Dictionary<long, SystemGraphNode> PopulateGraph(Dictionary<string, List<string>> systemsGraph)
        {
            Dictionary<long, SystemGraphNode> systemsDict = new Dictionary<long, SystemGraphNode>();

            //Create a dictionary with key of systemId and value of the graphNode
            foreach (var system in systemsGraph)
            {
                systemsDict[Convert.ToInt32(system.Key)] = new SystemGraphNode(system.Key);
            }


            foreach (var node in systemsDict)
            {
                foreach (var neighbor in systemsGraph[node.Key.ToString()])
                {
                    if (!string.IsNullOrEmpty(neighbor))
                    {
                        node.Value.Neighbors.Add(systemsDict[Convert.ToInt32(neighbor)]);
                    }
                }
            }

            return systemsDict;
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