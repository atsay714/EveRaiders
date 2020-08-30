using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EveRaiders.Web.Api.ViewModels
{

    public class BuybackOrReprocessResourceViewModel
    {
        [Required]
        public string ResourceName { get; set; }
        public double Count { get; set; }
    }
}
