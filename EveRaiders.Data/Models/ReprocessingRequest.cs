﻿using System;
using System.Collections.Generic;
using System.Text;
using EveRaiders.Data.Authentication;

namespace EveRaiders.Data.Models
{
    public class ReprocessingRequest
    {
        public ReprocessingRequest()
        {
            RequestedAt = DateTime.UtcNow;
        }

        public int Id { get; set; }
        public DateTime RequestedAt { get; set; }
        public double TotalPrice { get; set; }
        public virtual List<ResourceOrder> RawOres { get; set; }
        public virtual PilotName Pilot { get; set; }
    }
}
