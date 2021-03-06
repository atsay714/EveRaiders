﻿using AutoMapper;
using EveRaiders.Data.Models;
using EveRaiders.Data.Extensions;
using EveRaiders.Web.Api.ViewModels;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using EveRaiders.Data.Authentication;
using EveRaiders.Web.Api.ViewModels.Authentication;

namespace EveRaiders.Web.Api.Automapper
{
    public class AutoMappings : Profile
    {
        public AutoMappings()
        {
            CreateMap<Region, RegionViewModel>();

            CreateMap<PlanetResource, PlanetResourceViewModel>()
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type.ToString().SplitCamelCase()));

            CreateMap<Planet, PlanetViewModel>()
                .ForMember(src => src.System, opt => opt.MapFrom(dest => dest.System.Name))
                .ForMember(src => src.SystemId, opt => opt.MapFrom(dest => dest.System.Id))
                .ForMember(src => src.Constellation, opt => opt.MapFrom(dest => dest.System.Constellation.Name))
                .ForMember(src => src.SystemEveOnlineId, opt => opt.MapFrom(dest => dest.System.EveOnlineId))
                .ForMember(src => src.DistanceFromBase, opt => opt.MapFrom(dest => dest.System.DistanceFromBase -1))
                .ForMember(src => src.TypeId, opt => opt.MapFrom(dest => dest.EveOnlineTypeId));

            CreateMap<PlanetResource, ResourceRichnessViewModel>()
                .ForMember(src => src.ResourceType, opt => opt.MapFrom(dest => dest.Type))
                .ForMember(src => src.PlanetName, opt => opt.MapFrom(dest => dest.Planet.Name))
                .ForMember(src => src.DistanceFromBase, opt => opt.MapFrom(dest => dest.Planet.System.DistanceFromBase - 1))
                .ForMember(src => src.PlanetType, opt => opt.MapFrom(dest => dest.Planet.EveOnlineTypeId));

            CreateMap<Resource, ResourceViewModel>()
                .ForMember(src => src.Price, opt => opt.MapFrom(dest => (int)Math.Round(dest.Price * ((float)(100 - dest.Tax)/ 100),0)));

            CreateMap<BuybackOrRequestResourceQuantityViewModel, ResourceOrder>()
                .ForMember(src => src.ResourceId, opt => opt.MapFrom(dest => dest.Id))
                .ForMember(src => src.Id, opt => opt.Ignore());

            CreateMap<RaiderUser, UserViewModel>();

            CreateMap<PilotName, PilotViewModel>();

            CreateMap<BuybackRequest, BuyBackRequestViewModel>()
                .ForMember(src => src.Total, opt => opt.MapFrom(dest => dest.TotalPrice))
                .ForMember(src => src.Status, opt => opt.MapFrom(dest => dest.Status.ToString()))
                .ForMember(src => src.RequestedAt,
                    opt => opt.MapFrom(dest => dest.RequestedAt.ToString(CultureInfo.InvariantCulture)))
                .ForMember(src => src.Pilot, opt => opt.MapFrom(dest => dest.Pilot.Name))
                .ForMember(src => src.Resources, opt => opt.MapFrom(dest => dest.Resources.Select(s =>
                    new ResourceViewModel()
                    {
                        Id = s.ResourceId,
                        Name = s.Resource.Name,
                        Quantity = s.Quantity,
                        //Price = (int)Math.Round(s.Resource.Price * ((float)(100 - s.Resource.Tax) / 100), 0)
                        Price = s.Resource.Price,
                        TaxId = s.Resource.TaxId
                    })));

            CreateMap<ParticipationTokens, ParticipationTokensViewModel>()
                .ForMember(src => src.ParticipationTokenTypeId, opt => opt.MapFrom(dest => dest.ParticipationTokenTypeId))
                .ForMember(src => src.TinyTokenId, opt => opt.MapFrom(dest => dest.TinyTokenId))
                .ForMember(src => src.ExpirationDate, opt => opt.MapFrom(dest => dest.ExpirationDate))
                .ForMember(src => src.UsesRemaining, opt => opt.MapFrom(dest => dest.UsesRemaining))
                .ForMember(src => src.DateCreated, opt => opt.MapFrom(dest => dest.DateCreated))
                .ForMember(src => src.Id, opt => opt.MapFrom(dest => dest.Id));
        }
    }
}
