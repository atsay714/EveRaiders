using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Threading.Tasks;
using AutoMapper;
using EveRaiders.Data;
using EveRaiders.Data.Enums;
using EveRaiders.Web.Api.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace EveRaiders.Web.Api.Controllers
{
    [Authorize(Policy = "Members")]
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
        public IActionResult GetPlanetsByResourceAndRichness(string resourceType, string richnessType, int? regionId)
        {
            if (Enum.TryParse(resourceType, out PlanetResourceTypes resource) && Enum.TryParse(richnessType, out ResourceRichnessTypes richness))
            {
                var resources = _db.PlanetResources.Include(s => s.Planet).ThenInclude(s => s.System).ThenInclude(s => s.Constellation)
                    .ThenInclude(s => s.Region)
                    .Where(s => s.Richness == richness && s.Type == resource);

                if (regionId.HasValue && regionId != 0)
                    resources = resources.Where(s => s.Planet.System.Constellation.Region.Id == regionId.Value);

                var resourceResult = _mapper.Map<List<ResourceRichnessViewModel>>(resources.OrderBy(s => s.Planet.System.DistanceFromBase).ToList());

                return Ok(resourceResult);
            }
            else
            {
                return NotFound();
            }
        }

        [Produces("application/json")]
        [HttpGet("filters")]
        public IActionResult GetFilters()
        {
            var filters = new FilterViewModel
            {
                Types = Enum.GetNames(typeof(PlanetResourceTypes)).ToList(),
                Richness = Enum.GetNames(typeof(ResourceRichnessTypes)).ToList(),
                PlanetTypes = Enum.GetNames(typeof(PlanetTypes)).ToList(),
                Regions = _db.Regions.AsQueryable().Select(x => new RegionViewModel() { Id = x.Id, Name = x.Name }).ToList(),
                Constellations = _db.Constellations.AsQueryable().Select(x => new ConstellationViewModel() { Id = x.Id, Name = x.Name }).ToList()
            };
            return Ok(filters);
        }
    }
}