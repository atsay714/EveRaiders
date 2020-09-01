using EveRaiders.Data.Extensions;
using EveRaiders.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EveRaiders.Services.Interfaces
{
    public interface IService<T>
    {
        Task<List<T>> Get();
        Task<T> Get(int id);
    }
}
