using Microsoft.EntityFrameworkCore.Migrations;

namespace EveRaiders.Data.Migrations
{
    public partial class AddingDistanceToSystemInsteadOfPLanet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DistanceFromBase",
                table: "Planets");

            migrationBuilder.AddColumn<long>(
                name: "DistanceFromBase",
                table: "Systems",
                type: "bigint",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DistanceFromBase",
                table: "Systems");

            migrationBuilder.AddColumn<long>(
                name: "DistanceFromBase",
                table: "Planets",
                type: "bigint",
                nullable: true);
        }
    }
}
