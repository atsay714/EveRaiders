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
using HashidsNet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
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
            string error = "";
            try
            {
                var redeemedToken = await _participationServices.CreateRedeemParticipationToken(TinyTokenId, user.Id);
            }
            catch(Exception e)
            {
                error = e.Message;
            }

            //Return a total for the user. We can return either a history of their tokens, or just a total amount.
            return Ok(error);
        }

        [HttpGet("token")]
        public async Task<IActionResult> GetToken(int numberOfUses, int tokenType, int? tokenLength = null, DateTime? expiration = null)
        {
            //Default length to 5
            int length = tokenLength ?? 5;

            //Creates participation token for users to use
            var token = new ParticipationTokens()
            {
                TinyTokenId = "",
                UsesRemaining = numberOfUses,
                ParticipationTokenTypeId = tokenType,
                ExpirationDate = expiration ?? DateTime.UtcNow.AddMinutes(15) //if expiration is null, default it to 15 minutes

            };

            var createdToken = await _participationServices.CreateGetToken(token, length);

            return Ok(createdToken.TinyTokenId);
        }
        public class MyTempTable
        {
            public int Id { get; set; }
        }
    }
}
