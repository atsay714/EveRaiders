using System;
using System.Collections.Generic;
using System.Text;

namespace EveRaiders.Data.Models
{
    public class Tax
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double? BuyTax { get; set; }
        public double? SellTax { get; set; }
    }
}
