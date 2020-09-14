using System;
using System.Collections.Generic;
using System.Text;
using EveRaiders.Data.Authentication;
using EveRaiders.Data.Enums;

namespace EveRaiders.Data.Models
{
    public class BuybackRequest
    {
        public BuybackRequest()
        {
            RequestedAt = DateTime.UtcNow;
        }

        public int Id { get; set; }
        public DateTime RequestedAt { get; set; }
        public double TotalPrice { get; set; }
        public RequestStatus Status { get; set; }
        public virtual List<ResourceOrder> Resources { get; set; }
        public virtual PilotName Pilot { get; set; }
    }
}
