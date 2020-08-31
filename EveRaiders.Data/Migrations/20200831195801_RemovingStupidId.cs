using Microsoft.EntityFrameworkCore.Migrations;

namespace EveRaiders.Data.Migrations
{
    public partial class RemovingStupidId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EveEchoesId",
                table: "Planets");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "EveEchoesId",
                table: "Planets",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
