using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EveRaiders.Web.Api.ViewModels.Authentication
{
    public class UserViewModel
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string DiscordUser { get; set; }
        public bool Approved { get; set; }
        public bool SuperAdmin { get; set; }
        public List<PilotViewModel> PilotNames { get; set; }
    }
}
