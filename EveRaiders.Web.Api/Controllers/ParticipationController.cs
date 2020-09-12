using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using EveRaiders.Data;
using EveRaiders.Data.Authentication;
using EveRaiders.Data.Models;
using EveRaiders.Services;
using EveRaiders.Web.Api.ViewModels;
using EveRaiders.Web.Api.ViewModels.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace EveRaiders.Web.Api.Controllers
{
    //[Authorize(Policy = "Members")]
    [Route("participation")]
    [ApiController]
    public class ParticipationController : ControllerBase
    {
        private readonly EveRaidersContext _db;
        private readonly IMapper _mapper;
        private readonly UserManager<RaiderUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ParticipationServices _participationServices;


        public ParticipationController(EveRaidersContext db, IMapper mapper, UserManager<RaiderUser> userManager, RoleManager<IdentityRole> roleManager, ParticipationServices participationServices)
        {
            _db = db;
            _mapper = mapper;
            _userManager = userManager;
            _roleManager = roleManager;
            _participationServices = participationServices;
        }

        [HttpPost("redeemtoken")]
        public async Task<IActionResult> RedeemParticipationTokenRequest(string TinyTokenId)
        {
            var user = await _userManager.FindByNameAsync("atsay714");

            var redeemedToken = await _participationServices.CreateRedeemParticipationTokenRequest(TinyTokenId, user.Id);


            //Return a total for the user. We can either a history of their tokens, or just a total amount.
            return Ok(5);
        }

        [HttpGet("token")]
        public async Task<IActionResult> GetToken(int numberOfUses, int tokenType, int? tokenLength = null, DateTime? expiration = null)
        {
            //Default length to 5
            int length = 5;

            //Get Human Readable token of length
            var tinyToken = Utils.ParticipationTokenUtils.GenerateUniqueHumanReadableToken(tokenLength ?? length);

            //Creates participation token for users to use
            var token = new ParticipationTokens()
            {
                TinyTokenId = tinyToken,
                UsesRemaining = numberOfUses,
                ParticipationTokenTypeId = tokenType,
                ExpirationDate = expiration ?? DateTime.UtcNow.AddMinutes(15) //if expiration is null, default it to 15 minutes

            };

            var newToken = await _db.ParticipationTokens.AddAsync(token);
            await _db.SaveChangesAsync();

            return Ok(tinyToken);
            //var resources = await _db.Resources.ToListAsync();

            //var mappedResources = _mapper.Map<List<ResourceViewModel>>(resources);
            //return Ok(mappedResources);
        }
    }
}
