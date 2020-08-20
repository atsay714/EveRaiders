using System.Runtime.Serialization;

namespace EveRaiders.Importer
{
    public class PlanetInfoCsv
    {
        [DataMember(Name="Planet ID")]
        public long PlanetId { get; set; }
        public string Region { get; set; }
        public string Constellation { get; set; }
        public string System { get; set; }
        [DataMember(Name="Planet Name")]
        public string PlanetName { get; set; }
        [DataMember(Name="Planet Type")]
        public string PlanetType { get; set; }
        public string Resource { get; set; }
        public string Richness { get; set; }
        public string Output { get; set; }
    }
}