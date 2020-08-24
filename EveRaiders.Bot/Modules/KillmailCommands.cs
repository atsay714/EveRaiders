using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Discord;
using Discord.Commands;
using EveRaiders.Data;
using EveRaiders.Data.Extensions;
using Microsoft.EntityFrameworkCore;

namespace EveRaiders.Bot.Modules
{
    public class KillmailCommands : ModuleBase
    {
        private readonly EveRaidersContext _db = new EveRaidersContext(new DbContextOptionsBuilder<EveRaidersContext>()
            .UseSqlServer(@"Data Source = localhost; Initial Catalog = EveRaiders; Trusted_Connection=True;")
            .Options);


        [Command("killmail")]
        public async Task PlanetaryProduction([Remainder] string argsString = null)
        {
            if (argsString == null)
            {
                await ReplyAsync($"No commands passed. For help type !pi help");
            }
            else
            {
                var imageUrl = new Uri(argsString);
            }
        }
    }
}
