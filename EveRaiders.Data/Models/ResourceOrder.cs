using System;
using System.Collections.Generic;
using System.Text;

namespace EveRaiders.Data.Models
{
    public class ResourceOrder
    {
        public int Id { get; set; }

        public int ResourceId { get; set; }
        public virtual Resource Resource { get; set; }

        public int BuybackRequestId { get; set; }
        public virtual BuybackRequest BuybackRequest { get; set; }

        public int ReprocessingRequestId { get; set; }
        public virtual ReprocessingRequest ReprocessingRequest { get; set; }

        public double Quantity { get; set; }
        public double Price { get; set; }
    }
}
