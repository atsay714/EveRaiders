using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using EveRaiders.Data;
using EveRaiders.Data.Authentication;
using EveRaiders.Data.Enums;
using EveRaiders.Data.Models;
using EveRaiders.Services;
using EveRaiders.Web.Api.ViewModels.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore.Internal;
using EveRaiders.Web.Api.ViewModels;

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
        private readonly CorporationServices _corporationServices;
        private readonly EveRaidersContext _db;

        public AdministrationController(EveRaidersContext db, IMapper mapper, UserManager<RaiderUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, CorporationServices corporationService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _db = db;
            _mapper = mapper;
            _corporationServices = corporationService;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _db.Users.AsAsyncEnumerable().ToListAsync();
            return Ok(_mapper.Map<List<UserViewModel>>(users));
        }

        [HttpGet("orders/buyback")]
        public async Task<IActionResult> GetBuybackRequests()
        {
            var request = await _db.BuyBackRequests.Include(i => i.Resources).ThenInclude(i => i.Resource).Include(i => i.Pilot).Where(s => s.Resources.Count > 0).ToListAsync();

            var mappedRequest = _mapper.Map<List<BuyBackRequestViewModel>>(request);

            return Ok(mappedRequest);
        }

        [HttpPut("buyback/{buyBackRequestId}/status/{status}")]
        public async Task<IActionResult> UpdateBuybackRequestStatus(int buyBackRequestId, RequestStatus status)
        {
            var request = await _corporationServices.UpdatBuyBackRequestStatus(buyBackRequestId, status);

            if (request == null)
                return NotFound();

            return Ok(_mapper.Map<BuyBackRequestViewModel>(request));
        }

        [HttpPost]
        [Route("approve")]
        public async Task<IActionResult> Approve(string userName, bool approve)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
                return NotFound();

            user.Approved = approve;

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
                return Ok(_mapper.Map<UserViewModel>(user));

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

        [HttpGet("prices/resources")]
        public async Task<IActionResult> GetResourcePrices()
        {
            var resources = _db.Resources.AsQueryable()
                        .Join(_db.Taxes,
                              p => p.TaxId,
                              e => e.Id,
                              (p, e) => new ResourceViewModel
                              {
                                  Id = p.Id,
                                  Name = p.Name,
                                  Price = p.Price,
                                  TaxId = p.TaxId,
                                  TaxName = e.Name
                              }).ToList();

            return Ok(resources);
        }

        [HttpPost("prices/resources")]
        public async Task<IActionResult> UpdateResourcePrices([FromBody] List<Resource> resources)
        {
            foreach (var resource in resources)
            {
                _db.Entry(resource).State = EntityState.Modified;
            }

            await _db.SaveChangesAsync();

            return Ok(resources);
        }

        [HttpPut("prices/taxes")]
        public async Task<IActionResult> UpdateTax([FromBody] Tax tax)
        {
            string error = "";
            Tax updatedTax = null;
            try
            {
                updatedTax = await _corporationServices.UpdateTax(tax);
            }
            catch (Exception e)
            {
                error = e.Message;
            }
            await _db.SaveChangesAsync();

            return Ok(updatedTax);
        }

        [HttpPost("prices/taxes")]
        public async Task<IActionResult> CreateNewTax([FromBody] Tax tax)
        {
            string error = "";
            Tax createdTax = null;
            try
            {
                createdTax = await _corporationServices.CreateTax(tax);
            }
            catch (Exception e)
            {
                error = e.Message;
            }
            await _db.SaveChangesAsync();

            return Ok(createdTax);
        }

        [HttpGet("prices/taxes")]
        public async Task<IActionResult> GetTaxes()
        {
            var taxes = await _db.Taxes.AsAsyncEnumerable().ToListAsync();

            return Ok(taxes);
        }
    }
}
