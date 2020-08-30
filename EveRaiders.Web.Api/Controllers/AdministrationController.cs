using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EveRaiders.Data.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace EveRaiders.Web.Api.Controllers
{
    [Authorize(Policy = "SuperAdmin")]
    [Route("administration")]
    [ApiController]
    public class AdministrationController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<RaiderUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AdministrationController(UserManager<RaiderUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
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
                return Ok();
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
