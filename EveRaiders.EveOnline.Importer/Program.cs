using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EveRaiders.Data;
using EveRaiders.Data.Models;
using Flurl;
using Flurl.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json;

namespace EveRaiders.EveOnline.Importer
{
    class Program
    {
        private static readonly EveRaidersContext _db = new EveRaidersContext(new DbContextOptionsBuilder<EveRaidersContext>().UseSqlServer("Server=localhost;Database=everaiders;Trusted_Connection=True;").Options);
        private static readonly int HomeSystemId = 30000904;

        static async Task Main(string[] args)
        {
            await GetDistancesFromBase();
            //await GetPlanetInformation();

            //await MatchEveOnlineData();

            Console.WriteLine("Tasks Complete");
            Console.Read(); 
        }

        private static async Task GetPlanetInformation()
        {
            var solarSystemIds = await _db.Systems.Select(s => s.EveOnlineId).ToListAsync();
            var dbPlanets = await _db.Planets.ToListAsync();

            foreach (var solarSystemId in solarSystemIds)
            {
                try
                {
                    var solarSystem = await
                                $"https://esi.evetech.net/latest/universe/systems/{solarSystemId}/?datasource=tranquility&language=en-us"
                                    .GetJsonAsync<ViewModels.System>();

                    Console.WriteLine($"Getting information from {solarSystem.Name}");
                    foreach (var planetBase in solarSystem.Planets)
                    {
                        try
                        {
                            var planet = await $"https://esi.evetech.net/latest/universe/planets/{planetBase.PlanetId}/?datasource=tranquility"
                                                .GetJsonAsync<ViewModels.Planet>();

                            Console.WriteLine($"Updating {planet.Name}");
                            var dbPlanet = dbPlanets.FirstOrDefault(x => x.Name.Contains(planet.Name));

                            if (dbPlanet == null)
                                continue;

                            dbPlanet.EveOnlineTypeId = planet.TypeId;
                            dbPlanet.EveOnlineId = planet.PlanetId;
                            _db.Entry(dbPlanet).State = EntityState.Modified;
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine(ex);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                }
            }

            await _db.SaveChangesAsync();
        }

        private static  async Task GetDistancesFromBase()
        {
            Console.WriteLine("Fetching System Distances");
            var systemList = _db.Systems;

            foreach (var solarSystem in systemList.Where(s => s.EveOnlineId != 0 && s.DistanceFromBase == null))
            {
                try
                {
                    Console.WriteLine($"Updating {solarSystem.Name}");
                    solarSystem.DistanceFromBase = await RouteCalculator.Calculator(HomeSystemId, solarSystem.EveOnlineId);
                    _db.Entry(solarSystem).State = EntityState.Modified;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
                
            }
            

            await _db.SaveChangesAsync();
        }

        private static async Task MatchEveOnlineData()
        {
            Console.WriteLine("Matching with Eve Online data");
            var echoesSolarSystem = await _db.Systems.ToListAsync();

            foreach (var system in echoesSolarSystem)
            {
                Console.WriteLine($"Searching for {system.Name}");
                EOSearch solarSystemIds =
                    await
                        $"https://esi.evetech.net/latest/search/?categories=solar_system&datasource=tranquility&language=en-us&search={system.Name}&strict=true"
                            .GetJsonAsync<EOSearch>();

                if(solarSystemIds.SolarSystem.Count == 0)
                    continue;

                system.EveOnlineId = solarSystemIds.SolarSystem.FirstOrDefault();

                _db.Entry(system).State = EntityState.Modified;
            }

            await _db.SaveChangesAsync();
        }
    }

    public class EOSearch
    {
        [JsonProperty("solar_system")]
        public List<int> SolarSystem;
    }
}
