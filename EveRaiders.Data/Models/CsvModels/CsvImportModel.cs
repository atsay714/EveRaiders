using System;
using System.Collections.Generic;
using System.Text;

namespace EveRaiders.Data.Models.CsvModels
{
    public class CsvImportModel
    {
        public string Id { get; set; }
        public List<string> Neighbors { get; set; }
    }
}
