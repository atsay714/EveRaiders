using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace EveRaiders.Web.Api.Utils
{
    public static class ParticipationTokenUtils
    {
        //Create a tiny token of specified length
        public static string GenerateUniqueHumanReadableToken(int length)
        {
            return RandomIdGenerator.GetBase36(length);
        }

        public static class RandomIdGenerator
        {
            private static char[] _base62chars =
                "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                .ToCharArray();

            private static Random _random = new Random();

            public static string GetBase36(int length)
            {
                var sb = new StringBuilder(length);

                for (int i = 0; i < length; i++)
                    sb.Append(_base62chars[_random.Next(36)]);

                return sb.ToString();
            }
        }
    }

}
