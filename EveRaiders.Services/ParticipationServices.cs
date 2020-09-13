using System;
using System.Threading.Tasks;
using EveRaiders.Data;
using EveRaiders.Data.Models;
using HashidsNet;
using Humanizer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace EveRaiders.Services
{
    public class ParticipationServices
    {
        private readonly EveRaidersContext _db;

        public ParticipationServices(EveRaidersContext db)
        {
            _db = db;
        }

        public async Task<Participation> CreateRedeemParticipationToken(string tinyTokenId, string userId)
        {
            var token = await _db.ParticipationTokens
                .FirstOrDefaultAsync(s => s.TinyTokenId == tinyTokenId);

            if (token == null)
            {
                throw new NoMatchFoundException("Invalid Token");
            }

            if(DateTime.Compare(token.ExpirationDate, DateTime.UtcNow) < 0)
            {
                throw new SecurityTokenExpiredException("Token is expired");
            }

            var participation = new Participation()
            {
                ParticipationTokenId = token.Id,
                UserId = userId
            };

            //Add new participation entry
            await _db.Participation.AddAsync(participation);

            //Get the token
            var participationToken = await _db.ParticipationTokens.FirstOrDefaultAsync(s => s.Id == token.Id);

            //Decrement remaining uses
            participationToken.UsesRemaining = participationToken.UsesRemaining - 1;

            await _db.SaveChangesAsync();

            return participation;
        }

        public async Task<ParticipationTokens> CreateGetToken(ParticipationTokens token, int length)
        {
            var addedToken = await _db.ParticipationTokens.AddAsync(token);

            await _db.SaveChangesAsync();

            var hashIds = new Hashids("really cool raiders salt", length, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ");
            var tinyToken = hashIds.Encode(Convert.ToInt32(addedToken.Entity.Id));
            var numbers = hashIds.Decode(tinyToken);

            var participationToken = await _db.ParticipationTokens.FirstOrDefaultAsync(s => s.Id == addedToken.Entity.Id);
            participationToken.TinyTokenId = tinyToken;

            await _db.SaveChangesAsync();

            return participationToken;

        }
    }
}
