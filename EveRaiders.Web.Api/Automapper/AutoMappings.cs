using AutoMapper;
using EveRaiders.Data.Models;
using EveRaiders.Data.Extensions;
using EveRaiders.Web.Api.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EveRaiders.Web.Api.Automapper
{
    public class AutoMappings : Profile
    {
        public AutoMappings()
        {
            CreateMap<PlanetResource, PlanetResourceViewModel>()
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type.ToString().SplitCamelCase()));

            CreateMap<Planet, PlanetViewModel>()
                .ForMember(src => src.System, opt => opt.MapFrom(dest => dest.System.Name))
                .ForMember(src => src.Constellation, opt => opt.MapFrom(dest => dest.System.Constellation.Name));                       


        }
    }
}
