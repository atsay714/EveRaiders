using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EveRaiders.Web.Api.ViewModels
{
    public class PlanetViewModel
    {
        public int Id { get; set; }
        public int DistanceFromBase { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int TypeId { get; set; }
        public string System { get; set; }
        public long SystemEveOnlineId { get; set; }
        public long SystemId { get; set; }
        public string Constellation { get; set; }
        public List<PlanetResourceViewModel> Resources { get; set; }
    }

    public class PlanetResourceViewModel
    {
        public string Type { get; set; }
        public string Richness { get; set; }
        public double Output { get; set; }
    }
}
