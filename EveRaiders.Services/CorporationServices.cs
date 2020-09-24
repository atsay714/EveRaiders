using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using EveRaiders.Data;
using EveRaiders.Data.Authentication;
using EveRaiders.Data.Enums;
using EveRaiders.Data.Models;
using Humanizer;
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
            var taxList = await _db.Taxes.ToDictionaryAsync(x => x.Id, y => y.SellTax);
            double taxPercent = 0;
            foreach (var resource in resources)
            {
                var dbResource = await _db.Resources.FirstOrDefaultAsync(s => s.Id == resource.ResourceId);
                int taxId = dbResource.TaxId ?? 0;
                if(taxId != 0 && taxList.ContainsKey(taxId))
                {
                    taxPercent = taxList[taxId] ?? 0;
                }

                if (dbResource == null)
                    continue;

                total += resource.Quantity * dbResource.Price * ((float)(100 - taxPercent) /100);
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
        public async Task<Tax> UpdateTax(Tax tax)
        {
            var taxObj = await _db.Taxes
                .FirstOrDefaultAsync(s => s.Name == tax.Name);

            if (taxObj == null)
            {
                throw new NoMatchFoundException("No tax by that name found");
            }

            //update tax
            taxObj.BuyTax = tax.BuyTax;
            taxObj.SellTax = tax.SellTax;
            taxObj.Name = tax.Name;

            await _db.SaveChangesAsync();

            return taxObj;
        }
        public async Task<Tax> CreateTax(Tax tax)
        {
            var taxObj = new Tax()
            {
                Name = tax.Name,
                BuyTax = tax.BuyTax,
                SellTax = tax.SellTax
            };

            //Add new tax entry
            await _db.Taxes.AddAsync(taxObj);

            await _db.SaveChangesAsync();

            return taxObj;
        }
    }
}
