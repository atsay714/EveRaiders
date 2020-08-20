using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using EveRaiders.Data.Enums;

namespace EveRaiders.Data.Models
{
    public class Planet
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Required]
        public long Id { get; set; }
        public string Name { get; set; }
        public PlanetTypes Type { get; set; }
        public virtual List<PlanetResource> Resources { get; set; }
        
        public virtual UniverseSystem System { get; set; }
    }
}