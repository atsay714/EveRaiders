using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using EveRaiders.Data.Enums;

namespace EveRaiders.Web.Api.ViewModels
{

    public class BuybackOrReprocessResourceViewModel
    {
        public List<BuybackOrRequestResourceQuantityViewModel> Resources { get; set; }

        [Required]
        public int PilotNameId { get; set; }
        public TransactionTypes TransactionType { get; set; }
    }

    public class BuybackOrRequestResourceQuantityViewModel
    {
        [Required]
        public int Id { get; set; }
        public double Quantity { get; set; }
    }
}
