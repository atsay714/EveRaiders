﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using EveRaiders.Data;
using EveRaiders.Data.Authentication;
using EveRaiders.Services;
using EveRaiders.Web.Api.ViewModels.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EveRaiders.Web.Api.Controllers
{
    [Authorize(Policy = "Members")]
    [Route("users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly EveRaidersContext _db;
        private readonly IMapper _mapper;
        private readonly UserManager<RaiderUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly CorporationServices _corporationServices;


        public UsersController(EveRaidersContext db, IMapper mapper, UserManager<RaiderUser> userManager, RoleManager<IdentityRole> roleManager, CorporationServices corporationServices)
        {
            _db = db;
            _mapper = mapper;
            _userManager = userManager;
            _roleManager = roleManager;
            _corporationServices = corporationServices;
        }

        [HttpGet("orders")]
        public async Task<IActionResult> GetOrders()
        {
            var user = await _userManager.FindByIdAsync(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var request = await _db.BuyBackRequests.Include(i => i.User).Where(s => s.User.Id == user.Id)
                .AsAsyncEnumerable().ToListAsync();

            var mappedRequest = _mapper.Map<List<BuyBackRequestViewModel>>(request);

            return Ok(mappedRequest);
        }
    }
}