using EveRaiders.Data.Enums;

namespace EveRaiders.Data.Models
{
    public class PlanetResource
    {
        public int Id { get; set; }
        public double Output { get; set; }
        
        public PlanetResourceTypes Type { get; set; }
        public ResourceRichnessTypes Richness { get; set; }
        
        public virtual Planet Planet { get; set; }
    }
}