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

        public DbSet<PilotName> PilotNames { get; set; }
        public DbSet<Region> Regions { get; set; }
        public DbSet<Constellation> Constellations { get; set; }
        public DbSet<UniverseSystem> Systems { get; set; }
        public DbSet<Planet> Planets { get; set; }
        public DbSet<PlanetResource> PlanetResources { get; set; }
        public DbSet<Resource> Resources { get; set; }
        public DbSet<ResourceOrder> ResourceOrders { get; set; }
        public DbSet<ReprocessingRequest> ReprocessingRequests { get; set; }
        public DbSet<BuybackRequest> BuyBackRequests { get; set; }
        public DbSet<Participation> Participation { get; set; }
        public DbSet<ParticipationTokens> ParticipationTokens { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer(@"Data Source=localhost;Initial Catalog=EveRaiders;Trusted_Connection=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ResourceOrder>()
                .Property(p => p.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Resource>().HasData(
                new Resource { Id = 1, Name = "Lustering Alloy" },
                new Resource { Id = 2, Name = "Sheen Compound" },
                new Resource { Id = 3, Name = "Gleaming Alloy" },
                new Resource { Id = 4, Name = "Condensed Alloy" },
                new Resource { Id = 5, Name = "Precious Alloy" },
                new Resource { Id = 6, Name = "Motley Compound" },
                new Resource { Id = 7, Name = "Fiber Composite" },
                new Resource { Id = 8, Name = "Lucent Compound" },
                new Resource { Id = 9, Name = "Opulent Compound" },
                new Resource { Id = 10, Name = "Glossy Compound" },
                new Resource { Id = 11, Name = "Crystal Compound" },
                new Resource { Id = 12, Name = "Dark Compound" },
                new Resource { Id = 13, Name = "Reactive Gas" },
                new Resource { Id = 14, Name = "Noble Gas" },
                new Resource { Id = 15, Name = "Base Metals" },
                new Resource { Id = 16, Name = "Heavy Metals" },
                new Resource { Id = 17, Name = "Noble Metals" },
                new Resource { Id = 18, Name = "Reactive Metals" },
                new Resource { Id = 19, Name = "Toxic Metals" },
                new Resource { Id = 20, Name = "Industrial Fibers" },
                new Resource { Id = 21, Name = "Supertensile Plastics" },
                new Resource { Id = 22, Name = "Polyaramids" },
                new Resource { Id = 23, Name = "Coolant" },
                new Resource { Id = 24, Name = "Condensates" },
                new Resource { Id = 25, Name = "Construction Blocks" },
                new Resource { Id = 26, Name = "Nanites" },
                new Resource { Id = 27, Name = "Silicate Glass" },
                new Resource { Id = 28, Name = "Smartfab Units" },
                new Resource { Id = 29, Name = "Heavy Water" },
                new Resource { Id = 30, Name = "Suspended Plasma" },
                new Resource { Id = 31, Name = "Liquid Ozone" },
                new Resource { Id = 32, Name = "Ionic Solutions" },
                new Resource { Id = 33, Name = "Oxygen Isotopes" },
                new Resource { Id = 34, Name = "Plasmoids" },
                new Resource { Id = 35, Name = "Veldspar" },
                new Resource { Id = 36, Name = "Scordite" },
                new Resource { Id = 37, Name = "Pyroxeres" },
                new Resource { Id = 38, Name = "Plagioclase" },
                new Resource { Id = 39, Name = "Omber" },
                new Resource { Id = 40, Name = "Kernite" },
                new Resource { Id = 41, Name = "Jaspet" },
                new Resource { Id = 42, Name = "Hemorphite" },
                new Resource { Id = 43, Name = "Hedbergite" },
                new Resource { Id = 44, Name = "Dark Orche" },
                new Resource { Id = 45, Name = "Gneiss" },
                new Resource { Id = 46, Name = "Crokite" },
                new Resource { Id = 47, Name = "Spodanium" },
                new Resource { Id = 48, Name = "Bistot" },
                new Resource { Id = 49, Name = "Arkonor" },
                new Resource { Id = 50, Name = "Mercoxit" },
                new Resource { Id = 51, Name = "Tritanium" },
                new Resource { Id = 52, Name = "Pyerite" },
                new Resource { Id = 53, Name = "Mexallon" },
                new Resource { Id = 54, Name = "Isogen" },
                new Resource { Id = 55, Name = "Nocxium" },
                new Resource { Id = 56, Name = "Zydrine" },
                new Resource { Id = 57, Name = "Megacyte" },
                new Resource { Id = 58, Name = "Morphite" });

            base.OnModelCreating(modelBuilder);
        }
    }
}