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

namespace EveRaiders.EveOnline.Importer
{
    class Program
    {
        private static readonly EveRaidersContext _db = new EveRaidersContext(new DbContextOptionsBuilder<EveRaidersContext>().UseSqlServer("Server=everaider.database.windows.net;Initial Catalog=everaider;Persist Security Info=False;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;User ID=raider;Password=NUE1zu53qOG4;").Options);
        private static readonly int HomeSystemId = 30000904;

        static async Task Main(string[] args)
        {
            await GetDistancesFromBase();
            //await GetPlanetInformation();

            //await MatchEveOnlineData();
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

            List<long> solarSystemIds = await "https://esi.evetech.net/latest/universe/systems/?datasource=tranquility".GetJsonAsync<List<long>>();

            solarSystemIds = solarSystemIds.Where(i => !echoesSolarSystem.Select(s => s.EveOnlineId).Contains(i))
                .ToList();

            foreach (var solarSystemId in solarSystemIds)
            {
                try
                {
                    var solarSystem =
                        await
                            $"https://esi.evetech.net/latest/universe/systems/{solarSystemId}/?datasource=tranquility&language=en-us"
                                .GetJsonAsync<ViewModels.System>();

                    //Console.WriteLine($"Checking {solarSystem.Name}");

                    var dbSolarSystem = echoesSolarSystem.FirstOrDefault(s => s.Name.Contains(solarSystem.Name));
                    if (dbSolarSystem == null)
                        continue;

                    Console.WriteLine($"Found {solarSystem.Name}");

                    dbSolarSystem.EveOnlineId = solarSystemId;
                    _db.Entry(dbSolarSystem).State = EntityState.Modified;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }

            }

            await _db.SaveChangesAsync();
        }
    }
}
