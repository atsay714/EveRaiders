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
        private static readonly EveRaidersContext _db = new EveRaidersContext(new DbContextOptionsBuilder<EveRaidersContext>().UseSqlServer("Server=localhost;Database=everaiders;Trusted_Connection=True;").Options);
        static async Task Main(string[] args)
        {
            Console.WriteLine("Initializing Importer");


            TextReader readFile = new StreamReader("planetInfo.csv");
            var planetInfo = CsvSerializer.DeserializeFromReader<List<PlanetInfoCsv>>(readFile);
            await UpdateOrCreatePlanetResources(planetInfo);
            //Console.WriteLine("Importing Regions");
            //await CreateOrUpdateRegions(planetInfo);
            //Console.WriteLine("Importing Constellations");
            //await CreateOrUpdateConstellations(planetInfo);
            //Console.WriteLine("Importing Solar systems");
            //await CreateOrUpdateSystems(planetInfo);

            //await CreateOrUpdatePlanets(planetInfo);

            Console.WriteLine("Import Complete");
        }


        private static async Task UpdateOrCreatePlanetResources(List<PlanetInfoCsv> planetInfo)
        {
            var planetGroups = planetInfo.GroupBy(g => g.PlanetId);

            foreach (var resouceList in planetGroups.Select(s => s.ToList()))
            {
                try
                {
                    var planetBase = resouceList.FirstOrDefault(p => !string.IsNullOrEmpty(p.Region) && !string.IsNullOrEmpty(p.Constellation) && !string.IsNullOrEmpty(p.System) && !string.IsNullOrEmpty(p.PlanetName));

                    if (planetBase == null)
                        continue;

                    Console.WriteLine($"Adding planet {planetBase.PlanetName}");

                    var region = await _db.Regions.FirstOrDefaultAsync(r =>
                       r.Name == planetBase.Region);

                    if (region == null)
                    {
                        region = new Region()
                        {
                            Name = planetBase.Region
                        };
                        await _db.Regions.AddAsync(region);
                        await _db.SaveChangesAsync();
                    }

                    var constellation = await _db.Constellations.FirstOrDefaultAsync(c =>
                        c.Name == planetBase.Constellation);

                    if (constellation == null)
                    {
                        constellation = new Constellation()
                        {
                            Name = planetBase.Constellation,
                            Region = region
                        };
                        await _db.Constellations.AddAsync(constellation);
                        await _db.SaveChangesAsync();
                    }

                    var system = await _db.Systems.FirstOrDefaultAsync(c =>
                        c.Name == planetBase.System);

                    if (system == null)
                    {
                        system = new UniverseSystem()
                        {
                            Name = planetBase.System,
                            Constellation = constellation
                        };
                        await _db.Systems.AddAsync(system);
                        await _db.SaveChangesAsync();
                    }

                    var planet = await _db.Planets.FirstOrDefaultAsync(p => p.Id == planetBase.PlanetId);

                    Enum.TryParse(planetBase.PlanetType.RemoveWhitespace(), out PlanetTypes planetEnum);


                    if (planet == null)
                    {
                        planet = new Planet()
                        {
                            Name = planetBase.PlanetName,
                            Id = planetBase.PlanetId,
                            Type = planetEnum,
                            System = system,
                        };
                        await _db.Planets.AddAsync(planet);
                        await _db.SaveChangesAsync();
                    }

                    planet.Resources = new List<PlanetResource>();
                    foreach (var resource in resouceList)
                    {
                        Enum.TryParse(resource.Resource.RemoveWhitespace(), out PlanetResourceTypes resourceEnum);

                        Enum.TryParse(resource.Richness.RemoveWhitespace(), out ResourceRichnessTypes richnessEnum);
                        var dbResource = new PlanetResource()
                        {
                            Planet = planet,
                            Output = Double.Parse(resource.Output),
                            Type = resourceEnum,
                            Richness = richnessEnum
                        };

                        await _db.PlanetResources.AddAsync(dbResource);
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }
            }

            await _db.SaveChangesAsync();
        }

    }
}