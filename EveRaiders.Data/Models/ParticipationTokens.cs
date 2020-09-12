using System;
using System.Collections.Generic;
using System.Text;
using EveRaiders.Data.Authentication;
using EveRaiders.Data.Enums;

namespace EveRaiders.Data.Models
{
    public class ParticipationTokens
    {
        public ParticipationTokens()
        {
            DateCreated = DateTime.UtcNow;
        }
        public long Id { get; set; }
        public string TinyTokenId { get; set; }
        public int ParticipationTokenTypeId { get; set; }
        public int UsesRemaining { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}