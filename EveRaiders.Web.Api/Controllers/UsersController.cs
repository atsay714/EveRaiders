using System;
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

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var user = await _userManager.FindByIdAsync(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Ok(_mapper.Map<UserViewModel>(user));
        }

        [HttpPost("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UserViewModel user)
        {
            var raidUser = await _userManager.Users.Include(s => s.PilotNames)
                .SingleOrDefaultAsync(s => s.Id == user.Id.ToString());

            if (raidUser == null)
                return NotFound();

            foreach (var pilotName in raidUser.PilotNames)
            {
                if (user.PilotNames.Contains(pilotName.Name))
                    continue;

                _db.PilotNames.Remove(pilotName);
            }

            foreach (var pilotName in user.PilotNames)
            {
                if (raidUser.PilotNames.Select(s => s.Name).Contains(pilotName))
                    continue;

                await _db.PilotNames.AddAsync(new PilotName()
                {
                    User = raidUser,
                    Name = pilotName
                });
            }

            await _db.SaveChangesAsync();

            return Ok(_mapper.Map<UserViewModel>(raidUser));
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
