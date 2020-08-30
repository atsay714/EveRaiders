using EveRaiders.Data;
using EveRaiders.Data.Extensions;
using EveRaiders.Data.Models;
using EveRaiders.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EveRaiders.Services
{
    public class PlanetService : IService<Planet>
    {
        private readonly EveRaidersContext _context;

        public PlanetService(EveRaidersContext context)
        {
            _context = context;
        }
        public async Task<List<Planet>> Get()
        {
            return await _context.Planets.Include(i => i.Resources).Include(i => i.System).ToListAsync();
        }

        public async Task<Planet> Get(int id)
        {
            var planet = await _context.Planets.FindAsync(id);
            return planet;
        }
    }
}
