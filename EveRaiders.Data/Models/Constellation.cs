using System.Collections.Generic;

namespace EveRaiders.Data.Models
{
    public class Constellation
    {
        public long Id { get; set; }
        public string Name { get; set; }
        
        public virtual List<UniverseSystem> Systems { get; set; }
        
        public virtual Region Region { get; set; }
    }
}