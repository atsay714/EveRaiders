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
            throw new NotImplementedException();
        }

        public async Task<Planet> Get(int id)
        {
            throw new NotImplementedException();
        }
    }
}
