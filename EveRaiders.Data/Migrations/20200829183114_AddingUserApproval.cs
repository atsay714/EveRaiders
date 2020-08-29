using Microsoft.EntityFrameworkCore.Migrations;

namespace EveRaiders.Data.Migrations
{
    public partial class AddingUserApproval : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Approved",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "DiscordUser",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Approved",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "DiscordUser",
                table: "AspNetUsers");
        }
    }
}
