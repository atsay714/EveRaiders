using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Discord;
using Discord.Commands;
using EveRaiders.Data;
using EveRaiders.Data.Extensions;
using Microsoft.EntityFrameworkCore;

namespace EveRaiders.Bot.Modules
{
    public class PlanetCommands : ModuleBase
    {
        private readonly EveRaidersContext _db = new EveRaidersContext(new DbContextOptionsBuilder<EveRaidersContext>()
            .UseSqlServer(@"Data Source = localhost; Initial Catalog = EveRaiders; Trusted_Connection=True;")
            .Options);

        [Command("help")]
        public async Task Help()
        {
           // initialize empty string builder for reply
            var sb = new StringBuilder();
            var embed = new EmbedBuilder();
            // get user info from the Context
            var user = Context.User.Mention;
            // build out the reply
            sb.AppendLine("!pi - Planetary Production");
            sb.AppendLine("!market - Market Information");
            sb.AppendLine("!request - Corp Requests");

            embed.Title = "Available commands";
            embed.Description = sb.ToString();

            // send simple string reply
            await ReplyAsync($"Hello capsuleer {user}!");
            await ReplyAsync(null, false, embed.Build());
        }

        [Command("pi")]
        public async Task PlanetaryProduction([Remainder] string argsString = null)
        {
            if (argsString == null)
            {
                await ReplyAsync($"No commands passed. For help type !pi help");
            }
            else
            {
                var args = argsString.Split(" ");

                var baseCommand = args[0];

                var sb = new StringBuilder();
                var embed = new EmbedBuilder();
                switch (baseCommand)
                {
                    case "help":
                        sb.AppendLine("!pi system systemName - Fetch Planets Infromation for the select Solar System");
                        embed.Title = "Available commands";
                        embed.Description = sb.ToString();
                        await ReplyAsync(null, false, embed.Build());
                        break;

                    case "system":
                        var selectedSystem = args[1];
                        var dbSystem = await _db.Systems.Include(i => i.Planets).ThenInclude(i => i.Resources).FirstOrDefaultAsync(s => s.Name == selectedSystem);
                        foreach(var planet in dbSystem.Planets)
                        {
                            sb = new StringBuilder();
                            embed = new EmbedBuilder();

                            embed.Title = $"{planet.Name} - {planet.Type}";
                            foreach(var resource in planet.Resources)
                            {
                                sb.AppendLine($"{resource.Type.ToString().SplitCamelCase()} - {resource.Richness}");
                            }
                            embed.Description = sb.ToString();
                            await ReplyAsync(null, false, embed.Build());
                        }
                        break;

                }
            }
        }
    }
}