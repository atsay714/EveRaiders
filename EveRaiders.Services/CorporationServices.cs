using System;
using System.Collections.Generic;
using System.Text;
using EveRaiders.Data;
using EveRaiders.Data.Models;

namespace EveRaiders.Services
{
    public class CorporationServices
    {
        private readonly EveRaidersContext _context;

        public CorporationServices(EveRaidersContext context)
        {
            _context = context;
        }

        public List<BuybackRequest> CreateBuyBackRequest(List<Resource> resources, Guid userId)
        {
            throw new NotImplementedException();
        }
    }
}
