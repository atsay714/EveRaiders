using Microsoft.EntityFrameworkCore.Migrations;

namespace EveRaiders.Data.Migrations
{
    public partial class SeedInitialResources : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "PlanetaryResources",
                keyColumn: "Id",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "RawOres",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "RawOres",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "RawOres",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "RawOres",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "RawOres",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "RawOres",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "RawOres",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "RawOres",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "RawOres",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "RawOres",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "RawOres",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "RawOres",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "RawOres",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "RawOres",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "RawOres",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "RawOres",
                keyColumn: "Id",
                keyValue: 16);
        }
    }
}
