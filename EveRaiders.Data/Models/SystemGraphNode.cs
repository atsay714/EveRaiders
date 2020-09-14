using System;
using System.Collections.Generic;
using System.Text;

namespace EveRaiders.Data.Models
{
    public class SystemGraphNode
    {
        public SystemGraphNode(string id)
        {
            Id = id;
            Neighbors = new List<SystemGraphNode>();
        }
        public string Id { get; set; }
        public List<SystemGraphNode> Neighbors { get; set; }
        public int Distance { get; set; }
    }
}
