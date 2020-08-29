using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using EveRaiders.Data;
using EveRaiders.Data.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace EveRaiders.Web.Api.Controllers
{
    [Route("services")]
    [ApiController]
    public class CorporationServicesController : ControllerBase
    {
        private readonly EveRaidersContext _db;
        private readonly IMapper _mapper;
        private readonly UserManager<RaiderUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;


        public CorporationServicesController(EveRaidersContext db, IMapper mapper, UserManager<RaiderUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _db = db;
            _mapper = mapper;
            _userManager = userManager;
            _roleManager = roleManager;
        }
        public async Task<IActionResult> BuyBackRequest()
        {
            throw new NotImplementedException();
        }

        public async Task<IActionResult> ReprocessingRequest()
        {
            throw new NotImplementedException();
        }
    }
}
