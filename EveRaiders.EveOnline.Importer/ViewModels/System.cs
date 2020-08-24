using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace EveRaiders.EveOnline.Importer.ViewModels
{
    public class Planet    {
        [JsonProperty("name")]
        public string Name;

        [JsonProperty("planet_id")]
        public int PlanetId;

        [JsonProperty("position")]
        public Position Position;

        [JsonProperty("system_id")]
        public int SystemId;

        [JsonProperty("type_id")]
        public int TypeId;

        [JsonProperty("asteroid_belts")]
        public List<long> AsteroidBelts; 

        [JsonProperty("moons")]
        public List<long> Moons; 
    }

    public class Position    {
        [JsonProperty("x")]
        public float X; 

        [JsonProperty("y")]
        public float Y; 

        [JsonProperty("z")]
        public float Z; 
    }

    public class System    {
        [JsonProperty("constellation_id")]
        public long ConstellationId; 

        [JsonProperty("name")]
        public string Name; 

        [JsonProperty("planets")]
        public List<Planet> Planets; 

        [JsonProperty("position")]
        public Position Position; 

        [JsonProperty("security_class")]
        public string SecurityClass; 

        [JsonProperty("security_status")]
        public double SecurityStatus; 

        [JsonProperty("star_id")]
        public long StarId; 

        [JsonProperty("stargates")]
        public List<long> Stargates; 

        [JsonProperty("system_id")]
        public long SystemId; 
    }
}
