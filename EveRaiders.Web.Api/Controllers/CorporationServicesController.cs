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
    [Authorize(Policy = "Members")]
    [Route("services")]
    [ApiController]
    public class CorporationServicesController : ControllerBase
    {
        private readonly EveRaidersContext _db;
        private readonly IMapper _mapper;
        private readonly UserManager<RaiderUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly CorporationServices _corporationServices;


        public CorporationServicesController(EveRaidersContext db, IMapper mapper, UserManager<RaiderUser> userManager, RoleManager<IdentityRole> roleManager, CorporationServices corporationServices)
        {
            _db = db;
            _mapper = mapper;
            _userManager = userManager;
            _roleManager = roleManager;
            _corporationServices = corporationServices;
        }

        [HttpPost("buyback")]
        public async Task<IActionResult> BuyBackRequest([FromBody] BuybackOrReprocessResourceViewModel model)
        {
            var resources = _mapper.Map<List<ResourceOrder>>(model.Resources);

            var savedOrder = await _corporationServices.CreateBuyBackRequest(resources, model.PilotNameId, model.TransactionType);

            return Ok(_mapper.Map<BuyBackRequestViewModel>(savedOrder));
        }

        [HttpPost("reprocess")]
        public async Task<IActionResult> ReprocessingRequest([FromBody] List<BuybackOrReprocessResourceViewModel> model)
        {
            return Ok(model);
        }

        [HttpGet("resources")]
        public async Task<IActionResult> GetResources()
        {
            var resources = await _db.Resources.ToListAsync();

            var mappedResources = _mapper.Map<List<ResourceViewModel>>(resources);
            return Ok(mappedResources);
        }
    }
}
