using System.Collections.Generic;
using System.Threading.Tasks;
using Flurl.Http;

namespace EveRaiders.EveOnline.Importer
{
    public class RouteCalculator
    {
        public static async Task<int> Calculator(long origin, long destination)
        {
            var distance =  await $"https://esi.evetech.net/latest/route/{origin}/{destination}/?datasource=tranquility&flag=shortest".GetJsonAsync<List<long>>();

            return distance.Count;
        }
    }
}
