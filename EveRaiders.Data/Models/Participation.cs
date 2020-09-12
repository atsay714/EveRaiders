using System;
using System.Collections.Generic;
using System.Text;
using EveRaiders.Data.Authentication;
using EveRaiders.Data.Enums;

namespace EveRaiders.Data.Models
{
    public class Participation
    {
        public Participation()
        {
            DateClaimed = DateTime.UtcNow;
        }

        public long Id { get; set; }
        public string UserId { get; set; }
        public long ParticipationTokenId { get; set; }
        public DateTime DateClaimed { get; set; }
    }
}
