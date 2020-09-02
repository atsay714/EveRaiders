using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using EveRaiders.Data;
using EveRaiders.Data.Authentication;
using EveRaiders.Data.Enums;
using EveRaiders.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace EveRaiders.Services
{
    public class CorporationServices
    {
        private readonly EveRaidersContext _db;

        public CorporationServices(EveRaidersContext db)
        {
            _db = db;
        }

        public async Task<BuybackRequest> CreateBuyBackRequest(List<ResourceOrder> resources, int pilotId)
        {
            double total = 0;
            foreach (var resource in resources)
            {
                var dbResource = await _db.Resources.FirstOrDefaultAsync(s => s.Id == resource.ResourceId);
                if (dbResource == null)
                    continue;

                total += resource.Quantity * dbResource.Price;
            }

            var pilot = await _db.PilotNames.FirstOrDefaultAsync(s => s.Id == pilotId);

            var order = new BuybackRequest()
            {
                Pilot = pilot,
                Resources = resources,
                TotalPrice = total
            };

            var savedOrder = await _db.BuyBackRequests.AddAsync(order);
            await _db.SaveChangesAsync();


            return order;
        }

        public async Task<BuybackRequest> UpdatBuyBackRequestStatus(int buyBackId, RequestStatus status)
        {
            var request = await _db.BuyBackRequests.FirstOrDefaultAsync(s => s.Id == buyBackId);

            if (request == null)
                return null;

            request.Status = status;

            await _db.SaveChangesAsync();

            return request;
        }
    }
}
