using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EveRaiders.Data;
using EveRaiders.Data.Authentication;
using EveRaiders.Data.Enums;
using EveRaiders.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace EveRaiders.Services
{
    public class ParticipationServices
    {
        private readonly EveRaidersContext _db;

        public ParticipationServices(EveRaidersContext db)
        {
            _db = db;
        }

        public async Task<Participation> CreateRedeemParticipationTokenRequest(string tinyTokenId, string userId)
        {
            //Uhhh, this may be dumb. But unavoidable if we're using human readable tokens that are likely to collide. We'll just grab the latest created one...?
            var listOfMatchingTokens = await _db.ParticipationTokens
                .Where(s => s.TinyTokenId == tinyTokenId)
                .OrderByDescending(x => x.DateCreated)
                .ToListAsync();

            if (!listOfMatchingTokens.Any())
            {
                //exit somehow
            }

            var token = listOfMatchingTokens.FirstOrDefault();

            var participation = new Participation()
            {
                ParticipationTokenId = token.Id,
                UserId = userId
            };

            //Add new token entry
            var addedParticipationToken = await _db.Participation.AddAsync(participation);

            //Get the token
            var participationToken = await _db.ParticipationTokens.FirstOrDefaultAsync(s => s.Id == token.Id);

            //Decrement remaining uses
            participationToken.UsesRemaining = participationToken.UsesRemaining - 1;

            await _db.SaveChangesAsync();

            return participation;
        }

        //public async Task<BuybackRequest> UpdatBuyBackRequestStatus(int buyBackId, RequestStatus status)
        //{
        //    var request = await _db.BuyBackRequests.FirstOrDefaultAsync(s => s.Id == buyBackId);

        //    if (request == null)
        //        return null;

        //    request.Status = status;

        //    await _db.SaveChangesAsync();

        //    return request;
        //}
    }
}
