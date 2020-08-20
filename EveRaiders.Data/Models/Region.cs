using System.Collections.Generic;

namespace EveRaiders.Data.Models
{
    public class Region
    {
        public long Id { get; set; }
        public string Name { get; set; }
        
        public virtual List<Constellation> Constellations { get; set; }
    }
}