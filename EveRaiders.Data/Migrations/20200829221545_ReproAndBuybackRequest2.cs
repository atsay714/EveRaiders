using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EveRaiders.Data.Migrations
{
    public partial class ReproAndBuybackRequest2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BuybackRequestId",
                table: "RawOres",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ReprocessingRequestId",
                table: "RawOres",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BuybackRequestId",
                table: "PlanetResources",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "BuyBackRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RequestedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TotalPrice = table.Column<double>(type: "float", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BuyBackRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BuyBackRequests_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PlanetaryResources",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlanetaryResources", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ReprocessingRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RequestedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TotalPrice = table.Column<double>(type: "float", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReprocessingRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReprocessingRequests_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RawOres_BuybackRequestId",
                table: "RawOres",
                column: "BuybackRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_RawOres_ReprocessingRequestId",
                table: "RawOres",
                column: "ReprocessingRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_PlanetResources_BuybackRequestId",
                table: "PlanetResources",
                column: "BuybackRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_BuyBackRequests_UserId",
                table: "BuyBackRequests",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ReprocessingRequests_UserId",
                table: "ReprocessingRequests",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_PlanetResources_BuyBackRequests_BuybackRequestId",
                table: "PlanetResources",
                column: "BuybackRequestId",
                principalTable: "BuyBackRequests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RawOres_BuyBackRequests_BuybackRequestId",
                table: "RawOres",
                column: "BuybackRequestId",
                principalTable: "BuyBackRequests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RawOres_ReprocessingRequests_ReprocessingRequestId",
                table: "RawOres",
                column: "ReprocessingRequestId",
                principalTable: "ReprocessingRequests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlanetResources_BuyBackRequests_BuybackRequestId",
                table: "PlanetResources");

            migrationBuilder.DropForeignKey(
                name: "FK_RawOres_BuyBackRequests_BuybackRequestId",
                table: "RawOres");

            migrationBuilder.DropForeignKey(
                name: "FK_RawOres_ReprocessingRequests_ReprocessingRequestId",
                table: "RawOres");

            migrationBuilder.DropTable(
                name: "BuyBackRequests");

            migrationBuilder.DropTable(
                name: "PlanetaryResources");

            migrationBuilder.DropTable(
                name: "ReprocessingRequests");

            migrationBuilder.DropIndex(
                name: "IX_RawOres_BuybackRequestId",
                table: "RawOres");

            migrationBuilder.DropIndex(
                name: "IX_RawOres_ReprocessingRequestId",
                table: "RawOres");

            migrationBuilder.DropIndex(
                name: "IX_PlanetResources_BuybackRequestId",
                table: "PlanetResources");

            migrationBuilder.DropColumn(
                name: "BuybackRequestId",
                table: "RawOres");

            migrationBuilder.DropColumn(
                name: "ReprocessingRequestId",
                table: "RawOres");

            migrationBuilder.DropColumn(
                name: "BuybackRequestId",
                table: "PlanetResources");
        }
    }
}
