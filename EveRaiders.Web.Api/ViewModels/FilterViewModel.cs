using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EveRaiders.Web.Api.ViewModels
{
    public class FilterViewModel
    {
        public List<RegionViewModel> Regions { get; set; }
        public List<ConstellationViewModel> Constellations { get; set; }
        public List<SystemViewModel> Systems { get; set; }
        public List<string> Types { get; set; }
        public List<string> Richness { get; set; }
        public List<string> PlanetTypes { get; set; }
    }
}
