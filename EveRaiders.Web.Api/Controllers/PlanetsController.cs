using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Threading.Tasks;
using AutoMapper;
using EveRaiders.Data;
using EveRaiders.Data.Enums;
using EveRaiders.Web.Api.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EveRaiders.Web.Api.Controllers
{
    [Route("api/[controller]")]
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

            return Ok(_mapper.Map<List<PlanetViewModel>>(planetsList));
        }
    }
}