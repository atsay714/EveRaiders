using EveRaiders.Data.Extensions;
using EveRaiders.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EveRaiders.Services.Interfaces
{
    public interface IPlanetService
    {
        Task<List<Planet>> Get();
        //Task<List<Planet>> GetList(int? pageNumber, string sortField, string sortOrder);
        Task<Planet> Get(int id);
    }
}
