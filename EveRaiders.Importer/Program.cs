using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using EveRaiders.Data;
using EveRaiders.Data.Enums;
using EveRaiders.Data.Extensions;
using EveRaiders.Data.Models;
using Humanizer.Localisation;
using Microsoft.EntityFrameworkCore;
using ServiceStack.Text;

namespace EveRaiders.Importer
{
    public class Program
    {
        private static readonly EveRaidersContext _db = new EveRaidersContext(new DbContextOptionsBuilder<EveRaidersContext>().UseSqlServer("Server=everaider.database.windows.net;Initial Catalog=everaider;Persist Security Info=False;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;User ID=raider;Password=NUE1zu53qOG4;").Options);
        static async Task Main(string[] args)
        {
            Console.WriteLine("Initializing Importer");


            TextReader readFile = new StreamReader("planetInfo.csv");
            var planetInfo = CsvSerializer.DeserializeFromReader<List<PlanetInfoCsv>>(readFile);
            Console.WriteLine("Importing Regions");
            await CreateOrUpdateRegions(planetInfo);
            Console.WriteLine("Importing Constellations");
            await CreateOrUpdateConstellations(planetInfo);
            Console.WriteLine("Importing Solar systems");
            await CreateOrUpdateSystems(planetInfo);

            await CreateOrUpdatePlanets(planetInfo);

            Console.WriteLine("Import Complete");
        }



        private static async Task CreateOrUpdateRegions(List<PlanetInfoCsv> planetInfo)
        {
            var dbRegions = new List<Region>();
            var regionGroups = planetInfo.GroupBy(c => c.Region);
            var regionGroupCount = regionGroups.Count();

            foreach (var region in regionGroups.Select(s => s.Key))
            {
                var dbRegion = await _db.Regions.FirstOrDefaultAsync(s => s.Name == region);

                if (dbRegion != null)
                    continue;

                dbRegions.Add(new Region()
                {
                    Name = region
                });
            }

            await _db.Regions.AddRangeAsync(dbRegions);

            await _db.SaveChangesAsync();
        }

        private static async Task CreateOrUpdateConstellations(List<PlanetInfoCsv> planetInfo)
        {
            var dbCostellations = new List<Constellation>();
            var constellationGrousps = planetInfo.GroupBy(s => s.Constellation);
            var constellationGrouspsCount = constellationGrousps.Count();

            foreach (var constellationGroup in constellationGrousps)
            {
                var constellation = constellationGroup.FirstOrDefault();

                if (constellation == null)
                    continue;

                var dbRegion = await _db.Regions.FirstOrDefaultAsync(s => s.Name == constellation.Region);

                if (dbRegion == null)
                    continue;

                var dbConstellation =
                    await _db.Constellations.FirstOrDefaultAsync(s => s.Name == constellation.Constellation);

                if (dbConstellation != null)
                    continue;

                dbCostellations.Add(new Constellation()
                {
                    Name = constellation.Constellation,
                    Region = dbRegion
                });
            }

            await _db.Constellations.AddRangeAsync(dbCostellations);
            await _db.SaveChangesAsync();
        }

        private static async Task CreateOrUpdateSystems(List<PlanetInfoCsv> planetInfo)
        {
            var dbSystems = new List<UniverseSystem>();
            var constellations = await _db.Constellations.ToListAsync();
            var systems = await _db.Systems.ToListAsync();
            var systemsGroups = planetInfo.GroupBy(s => s.System);
            var systemsGroupCount = systemsGroups.Count();

            Parallel.ForEach(systemsGroups, (systemGroup) =>
            {
                var system = systemGroup.FirstOrDefault();

                if (system == null)
                    return;

                var dbConstellation = constellations.FirstOrDefault(s => s.Name == system.Constellation);

                if (dbConstellation == null)
                    return;

                var dbSystem = systems.FirstOrDefault(s => s.Name == system.System);

                if (dbSystem != null)
                    return;

                dbSystems.Add(new UniverseSystem()
                {
                    Name = system.System,
                    Constellation = dbConstellation
                });
            });

            await _db.Systems.AddRangeAsync(dbSystems);
            await _db.SaveChangesAsync();
        }

        private static async Task CreateOrUpdatePlanets(List<PlanetInfoCsv> planetInfo)
        {
            var planets = await _db.Planets.ToListAsync();
            var resources = await _db.PlanetResources.Include(s => s.Planet).ToListAsync();
            var systems = await _db.Systems.ToListAsync();

            var dbPlanets = new List<Planet>();
            var dbResources = new List<PlanetResource>();

            Console.WriteLine("Upserting Planets");
            int i = 1;
            Parallel.ForEach(planetInfo.GroupBy(s => s.PlanetName), (planetGroup) =>
            {
                {
                    var planetGroupBase = planetGroup.FirstOrDefault();

                    if (planetGroupBase == null)
                        return;

                    Enum.TryParse(planetGroupBase.PlanetType.RemoveWhitespace(), out PlanetTypes planetEnum);

                    var dbSystem = systems.FirstOrDefault(s => s.Name == planetGroupBase.System);
                    if (dbSystem == null)
                        return;

                    var dbPlanet = planets.FirstOrDefault(s => s.Id == planetGroupBase.PlanetId);

                    if (dbPlanet != null)
                        return;

                    dbPlanet = new Planet()
                    {
                        Id = planetGroupBase.PlanetId,
                        Name = planetGroupBase.PlanetName,
                        Type = planetEnum,
                        System = dbSystem
                    };

                    dbPlanets.Add(dbPlanet);

                    foreach (var planet in planetGroup)
                    {
                        if(planet.PlanetId == 40057813)
                            Console.WriteLine("OMG");
                        Console.WriteLine($"{i} - {planet.PlanetName}");
                        i++;
                        Enum.TryParse(planet.Resource.RemoveWhitespace(), out PlanetResourceTypes resourceEnum);

                        Enum.TryParse(planet.Richness.RemoveWhitespace(), out ResourceRichnessTypes richnessEnum);

                        var dbResource = resources.FirstOrDefault(s => s.Planet.Id == planet.PlanetId && s.Type == resourceEnum);

                        if (dbResource != null)
                            continue;

                        dbResource = new PlanetResource()
                        {
                            Planet = dbPlanet,
                            Type = resourceEnum,
                            Richness = richnessEnum
                        };
                        dbResources.Add(dbResource);
                    }

                }
            });

            await _db.Planets.AddRangeAsync(dbPlanets);
            await _db.PlanetResources.AddRangeAsync(dbResources);

            await _db.SaveChangesAsync();
        }
    }
}