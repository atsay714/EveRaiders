using System;
using System.Collections.Generic;
using System.Text;
using EveRaiders.Data.Authentication;
using EveRaiders.Data.Enums;

namespace EveRaiders.Data.Models
{
    public class ParticipationTokenTypes
    {
        public int Id { get; set; }
        public string TokenName { get; set; }
        public string TokenDescription { get; set; }
        public int Score { get; set; }
    }
}
