using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using EveRaiders.Data;
using EveRaiders.Data.Authentication;
using EveRaiders.Web.Api.ViewModels.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace EveRaiders.Web.Api.Controllers
{
    //[Authorize(Policy = "SuperAdmin")]
    [Route("administration")]
    [ApiController]
    public class AdministrationController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly UserManager<RaiderUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly EveRaidersContext _db;

        public AdministrationController(EveRaidersContext db,IMapper mapper, UserManager<RaiderUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _db = db;
            _mapper = mapper;
        }


        [HttpGet("user")]
        public async Task<IActionResult> GetUserInformation()
        {
            var user = await _userManager.FindByIdAsync(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            return Ok(_mapper.Map<UserViewModel>(user));
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _db.Users.ToListAsync();
            return Ok(_mapper.Map<List<UserViewModel>>(users));
        }

        [HttpPost]
        [Route("approve")]
        public async Task<IActionResult> Approve(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
                return NotFound();

            user.Approved = true;

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
                return Ok(_mapper.Map<UserViewModel>(user));
            else
                return Conflict(result);
        }

        [HttpPost]
        [Route("promote")]
        public async Task<IActionResult> Promote(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
                return NotFound();

            user.SuperAdmin = true;

            var result = await _userManager.UpdateAsync(user);


            if (result.Succeeded)
                return Ok();
            else
                return Conflict(result);
        }

    }
}
