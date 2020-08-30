using Microsoft.EntityFrameworkCore.Migrations;

namespace EveRaiders.Data.Migrations
{
    public partial class fixingDataModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlanetResources_BuyBackRequests_BuybackRequestId",
                table: "PlanetResources");

            migrationBuilder.DropTable(
                name: "PlanetaryResources");

            migrationBuilder.DropTable(
                name: "RawOres");

            migrationBuilder.DropIndex(
                name: "IX_PlanetResources_BuybackRequestId",
                table: "PlanetResources");

            migrationBuilder.DropColumn(
                name: "BuybackRequestId",
                table: "PlanetResources");

            migrationBuilder.CreateTable(
                name: "Resources",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: false),
                    BuybackRequestId = table.Column<int>(type: "int", nullable: true),
                    ReprocessingRequestId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Resources", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Resources_BuyBackRequests_BuybackRequestId",
                        column: x => x.BuybackRequestId,
                        principalTable: "BuyBackRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Resources_ReprocessingRequests_ReprocessingRequestId",
                        column: x => x.ReprocessingRequestId,
                        principalTable: "ReprocessingRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Resources",
                columns: new[] { "Id", "BuybackRequestId", "Name", "Price", "ReprocessingRequestId" },
                values: new object[,]
                {
                    { 1, null, "Lustering Alloy", 0.0, null },
                    { 28, null, "Smartfab Units", 0.0, null },
                    { 29, null, "Heavy Water", 0.0, null },
                    { 30, null, "Suspended Plasma", 0.0, null },
                    { 31, null, "Liquid Ozone", 0.0, null },
                    { 32, null, "Ionic Solutions", 0.0, null },
                    { 33, null, "Oxygen Isotopes", 0.0, null },
                    { 34, null, "Plasmoids", 0.0, null },
                    { 35, null, "Veldspar", 0.0, null },
                    { 36, null, "Scordite", 0.0, null },
                    { 37, null, "Pyroxeres", 0.0, null },
                    { 38, null, "Plagioclase", 0.0, null },
                    { 39, null, "Omber", 0.0, null },
                    { 40, null, "Kernite", 0.0, null },
                    { 41, null, "Jaspet", 0.0, null },
                    { 42, null, "Hemorphite", 0.0, null },
                    { 43, null, "Hedbergite", 0.0, null },
                    { 44, null, "Dark Orche", 0.0, null },
                    { 45, null, "Gneiss", 0.0, null },
                    { 46, null, "Crokite", 0.0, null },
                    { 47, null, "Spodanium", 0.0, null },
                    { 48, null, "Bistot", 0.0, null },
                    { 27, null, "Silicate Glass", 0.0, null },
                    { 26, null, "Nanites", 0.0, null },
                    { 25, null, "Construction Blocks", 0.0, null },
                    { 24, null, "Condensates", 0.0, null },
                    { 2, null, "Sheen Compound", 0.0, null },
                    { 3, null, "Gleaming Alloy", 0.0, null },
                    { 4, null, "Condensed Alloy", 0.0, null },
                    { 5, null, "Precious Alloy", 0.0, null },
                    { 6, null, "Motley Compound", 0.0, null },
                    { 7, null, "Fiber Composite", 0.0, null },
                    { 8, null, "Lucent Compound", 0.0, null },
                    { 9, null, "Opulent Compound", 0.0, null },
                    { 10, null, "Glossy Compound", 0.0, null },
                    { 11, null, "Crystal Compound", 0.0, null },
                    { 49, null, "Arkonor", 0.0, null },
                    { 12, null, "Dark Compound", 0.0, null },
                    { 14, null, "Noble Gas", 0.0, null },
                    { 15, null, "Base Metals", 0.0, null },
                    { 16, null, "Heavy Metals", 0.0, null },
                    { 17, null, "Noble Metals", 0.0, null },
                    { 18, null, "Reactive Metals", 0.0, null },
                    { 19, null, "Toxic Metals", 0.0, null },
                    { 20, null, "Industrial Fibers", 0.0, null },
                    { 21, null, "Supertensile Plastics", 0.0, null },
                    { 22, null, "Polyaramids", 0.0, null },
                    { 23, null, "Coolant", 0.0, null },
                    { 13, null, "Reactive Gas", 0.0, null },
                    { 50, null, "Mercoxit", 0.0, null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Resources_BuybackRequestId",
                table: "Resources",
                column: "BuybackRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_Resources_ReprocessingRequestId",
                table: "Resources",
                column: "ReprocessingRequestId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Resources");

            migrationBuilder.AddColumn<int>(
                name: "BuybackRequestId",
                table: "PlanetResources",
                type: "int",
                nullable: true);

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
                name: "RawOres",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BuybackRequestId = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: false),
                    ReprocessingRequestId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RawOres", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RawOres_BuyBackRequests_BuybackRequestId",
                        column: x => x.BuybackRequestId,
                        principalTable: "BuyBackRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RawOres_ReprocessingRequests_ReprocessingRequestId",
                        column: x => x.ReprocessingRequestId,
                        principalTable: "ReprocessingRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "PlanetaryResources",
                columns: new[] { "Id", "Name", "Price" },
                values: new object[,]
                {
                    { 1, "Lustering Alloy", 0.0 },
                    { 20, "Industrial Fibers", 0.0 },
                    { 21, "Supertensile Plastics", 0.0 },
                    { 22, "Polyaramids", 0.0 },
                    { 23, "Coolant", 0.0 },
                    { 24, "Condensates", 0.0 },
                    { 26, "Nanites", 0.0 },
                    { 19, "Toxic Metals", 0.0 },
                    { 27, "Silicate Glass", 0.0 },
                    { 29, "Heavy Water", 0.0 },
                    { 30, "Suspended Plasma", 0.0 },
                    { 31, "Liquid Ozone", 0.0 },
                    { 32, "Ionic Solutions", 0.0 },
                    { 33, "Oxygen Isotopes", 0.0 },
                    { 34, "Plasmoids", 0.0 },
                    { 28, "Smartfab Units", 0.0 },
                    { 18, "Reactive Metals", 0.0 },
                    { 25, "Construction Blocks", 0.0 },
                    { 16, "Heavy Metals", 0.0 },
                    { 17, "Noble Metals", 0.0 },
                    { 3, "Gleaming Alloy", 0.0 },
                    { 4, "Condensed Alloy", 0.0 },
                    { 5, "Precious Alloy", 0.0 },
                    { 6, "Motley Compound", 0.0 },
                    { 7, "Fiber Composite", 0.0 },
                    { 8, "Lucent Compound", 0.0 },
                    { 2, "Sheen Compound", 0.0 },
                    { 10, "Glossy Compound", 0.0 },
                    { 11, "Crystal Compound", 0.0 },
                    { 12, "Dark Compound", 0.0 },
                    { 13, "Reactive Gas", 0.0 },
                    { 14, "Noble Gas", 0.0 },
                    { 15, "Base Metals", 0.0 },
                    { 9, "Opulent Compound", 0.0 }
                });

            migrationBuilder.InsertData(
                table: "RawOres",
                columns: new[] { "Id", "BuybackRequestId", "Name", "Price", "ReprocessingRequestId" },
                values: new object[,]
                {
                    { 14, null, "Bistot", 0.0, null },
                    { 13, null, "Spodanium", 0.0, null },
                    { 12, null, "Crokite", 0.0, null },
                    { 11, null, "Gneiss", 0.0, null },
                    { 10, null, "Dark Orche", 0.0, null },
                    { 9, null, "Hedbergite", 0.0, null },
                    { 8, null, "Hemorphite", 0.0, null },
                    { 5, null, "Omber", 0.0, null },
                    { 6, null, "Kernite", 0.0, null },
                    { 4, null, "Plagioclase", 0.0, null },
                    { 3, null, "Pyroxeres", 0.0, null },
                    { 2, null, "Scordite", 0.0, null },
                    { 1, null, "Veldspar", 0.0, null },
                    { 15, null, "Arkonor", 0.0, null },
                    { 7, null, "Jaspet", 0.0, null },
                    { 16, null, "Mercoxit", 0.0, null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_PlanetResources_BuybackRequestId",
                table: "PlanetResources",
                column: "BuybackRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_RawOres_BuybackRequestId",
                table: "RawOres",
                column: "BuybackRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_RawOres_ReprocessingRequestId",
                table: "RawOres",
                column: "ReprocessingRequestId");

            migrationBuilder.AddForeignKey(
                name: "FK_PlanetResources_BuyBackRequests_BuybackRequestId",
                table: "PlanetResources",
                column: "BuybackRequestId",
                principalTable: "BuyBackRequests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
