using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EveRaiders.Data.Enums;

namespace EveRaiders.Web.Api.ViewModels
{
    public class ResourceRichnessViewModel
    {
        public PlanetResourceTypes ResourceType { get; set; }
        public ResourceRichnessTypes Richness { get; set; }
        public string PlanetName { get; set; }
        public int PlanetType { get; set; }
        public int DistanceFromBase { get; set; }
    }
}
