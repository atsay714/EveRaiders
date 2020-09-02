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
        public double Total { get; set; }
        public string User { get; set; }
    }
}
