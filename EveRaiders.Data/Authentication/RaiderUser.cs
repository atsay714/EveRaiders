using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace EveRaiders.Data.Authentication
{
    public class RaiderUser : IdentityUser
    {
        public bool Approved { get; set; }
        public bool SuperAdmin { get; set; }
        public string DiscordUser { get; set; }

        public virtual List<PilotName> PilotNames { get; set; }
    }
}
