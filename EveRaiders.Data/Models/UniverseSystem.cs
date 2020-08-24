using System.Collections.Generic;

namespace EveRaiders.Data.Models
{
    public class UniverseSystem
    {
        public long Id { get; set; }
        public long EveOnlineId { get; set; }
        public long? DistanceFromBase { get; set; }
        public string Name { get; set; }
        
        public virtual List<Planet> Planets { get; set; }
        
        public virtual Constellation Constellation { get; set; }
    }
}