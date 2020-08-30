using EveRaiders.Data.Authentication;
using EveRaiders.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EveRaiders.Data
{
    public class EveRaidersContext : IdentityDbContext<RaiderUser>
    {
        public EveRaidersContext() { }
        public EveRaidersContext(DbContextOptions<EveRaidersContext> options) : base(options) { }


        public DbSet<Region> Regions { get; set; }
        public DbSet<Constellation> Constellations { get; set; }
        public DbSet<UniverseSystem> Systems { get; set; }
        public DbSet<Planet> Planets { get; set; }
        public DbSet<PlanetResource> PlanetResources { get; set; }
        public DbSet<RawOre> RawOres { get; set; }
        public DbSet<ReprocessingRequest> ReprocessingRequests { get; set; }
        public DbSet<PlanetaryResource> PlanetaryResources { get; set; }
        public DbSet<BuybackRequest> BuyBackRequests { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer(@"Data Source=localhost;Initial Catalog=EveRaiders;Trusted_Connection=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RawOre>().HasData(
                new RawOre { Id = 1, Name = "Veldspar" },
                new RawOre { Id = 2, Name = "Scordite" },
                new RawOre { Id = 3, Name = "Pyroxeres" },
                new RawOre { Id = 4, Name = "Plagioclase" },
                new RawOre { Id = 5, Name = "Omber" },
                new RawOre { Id = 6, Name = "Kernite" },
                new RawOre { Id = 7, Name = "Jaspet" },
                new RawOre { Id = 8, Name = "Hemorphite" },
                new RawOre { Id = 9, Name = "Hedbergite" },
                new RawOre { Id = 10, Name = "Dark Orche" },
                new RawOre { Id = 11, Name = "Gneiss" },
                new RawOre { Id = 12, Name = "Crokite" },
                new RawOre { Id = 13, Name = "Spodanium" },
                new RawOre { Id = 14, Name = "Bistot" },
                new RawOre { Id = 15, Name = "Arkonor" },
                new RawOre { Id = 16, Name = "Mercoxit" });

            modelBuilder.Entity<PlanetaryResource>().HasData(
                new PlanetaryResource { Id = 1, Name = "Lustering Alloy" },
                new PlanetaryResource { Id = 2, Name = "Sheen Compound" },
                new PlanetaryResource { Id = 3, Name = "Gleaming Alloy" },
                new PlanetaryResource { Id = 4, Name = "Condensed Alloy" },
                new PlanetaryResource { Id = 5, Name = "Precious Alloy" },
                new PlanetaryResource { Id = 6, Name = "Motley Compound" },
                new PlanetaryResource { Id = 7, Name = "Fiber Composite" },
                new PlanetaryResource { Id = 8, Name = "Lucent Compound" },
                new PlanetaryResource { Id = 9, Name = "Opulent Compound" },
                new PlanetaryResource { Id = 10, Name = "Glossy Compound" },
                new PlanetaryResource { Id = 11, Name = "Crystal Compound" },
                new PlanetaryResource { Id = 12, Name = "Dark Compound" },
                new PlanetaryResource { Id = 13, Name = "Reactive Gas" },
                new PlanetaryResource { Id = 14, Name = "Noble Gas" },
                new PlanetaryResource { Id = 15, Name = "Base Metals" },
                new PlanetaryResource { Id = 16, Name = "Heavy Metals" },
                new PlanetaryResource { Id = 17, Name = "Noble Metals" },
                new PlanetaryResource { Id = 18, Name = "Reactive Metals" },
                new PlanetaryResource { Id = 19, Name = "Toxic Metals" },
                new PlanetaryResource { Id = 20, Name = "Industrial Fibers" },
                new PlanetaryResource { Id = 21, Name = "Supertensile Plastics" },
                new PlanetaryResource { Id = 22, Name = "Polyaramids" },
                new PlanetaryResource { Id = 23, Name = "Coolant" },
                new PlanetaryResource { Id = 24, Name = "Condensates" },
                new PlanetaryResource { Id = 25, Name = "Construction Blocks" },
                new PlanetaryResource { Id = 26, Name = "Nanites" },
                new PlanetaryResource { Id = 27, Name = "Silicate Glass" },
                new PlanetaryResource { Id = 28, Name = "Smartfab Units" },
                new PlanetaryResource { Id = 29, Name = "Heavy Water" },
                new PlanetaryResource { Id = 30, Name = "Suspended Plasma" },
                new PlanetaryResource { Id = 31, Name = "Liquid Ozone" },
                new PlanetaryResource { Id = 32, Name = "Ionic Solutions" },
                new PlanetaryResource { Id = 33, Name = "Oxygen Isotopes" },
                new PlanetaryResource { Id = 34, Name = "Plasmoids" });

            base.OnModelCreating(modelBuilder);
        }
    }
}