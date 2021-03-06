﻿using System;
using System.Collections.Generic;
using System.Text;

namespace EveRaiders.Data.Models
{
    public class Resource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int Tax { get; set; }
        public int? TaxId { get; set; }
        public virtual List<ResourceOrder> Orders { get; set; }
    }
}
