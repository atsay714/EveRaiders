using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using EveRaiders.Data.Enums;

namespace EveRaiders.Web.Api.ViewModels
{
    public class ParticipationTokensViewModel
    {
        public long Id { get; set; }
        public string TinyTokenId { get; set; }
        public int ParticipationTokenTypeId { get; set; }
        public string? TokenName { get; set; }
        public int UsesRemaining { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}
