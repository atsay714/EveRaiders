using CsvHelper.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EveRaiders.Data.Models.CsvModels
{
    public class CsvImportMap : ClassMap<CsvImportModel>
    {
        public CsvImportMap()
        {
            Map(x => x.Id).Index(0);
            Map(x => x.Neighbors).Index(1).ConvertUsing(row =>
            {
                string columnValue = row.GetField<string>("neighbors");
                return columnValue?.Split(',')?.ToList() ?? new List<string>();
            });
        }
    }
}
