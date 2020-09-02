using System;
using System.Collections.Generic;
using System.Text;

namespace EveRaiders.Data.Authentication
{
    public class PilotName
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual RaiderUser User { get; set; }
    }
}
