using EveRaiders.Data.Authentication;
using EveRaiders.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EveRaiders.Data
{
    public class EveRaidersContext : IdentityDbContext<RaiderUser>
    {
        public EveRaidersContext(){}
        public EveRaidersContext(DbContextOptions<EveRaidersContext> options) : base(options) { }


        public DbSet<Region> Regions { get; set; }
        public DbSet<Constellation> Constellations { get; set; }
        public DbSet<UniverseSystem> Systems { get; set; }
        public DbSet<Planet> Planets { get; set; }
        public DbSet<PlanetResource> PlanetResources { get; set; }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer(@"Data Source=localhost;Initial Catalog=EveRaiders;Trusted_Connection=True;");
        }
    }
}