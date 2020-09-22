using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EveRaiders.Web.Api.ViewModels
{
    public class ResourceViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public double Quantity { get; set; }
        public int? TaxId { get; set; }
        public string? TaxName { get; set; }
    }
}
