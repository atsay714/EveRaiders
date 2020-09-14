using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EveRaiders.Data.Enums;

namespace EveRaiders.Web.Api.ViewModels.Authentication
{
    public class BuyBackRequestViewModel
    {
        public int Id { get; set; }
        public string RequestedAt { get; set; }
        public string Status { get; set; }
        public int Total { get; set; }
        public List<ResourceViewModel> Resources { get; set; }
        public string Pilot { get; set; }
    }
}
