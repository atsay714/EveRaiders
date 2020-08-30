using Microsoft.EntityFrameworkCore.Migrations;

namespace EveRaiders.Data.Migrations
{
    public partial class FixingQuantity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Resources_BuyBackRequests_BuybackRequestId",
                table: "Resources");

            migrationBuilder.DropForeignKey(
                name: "FK_Resources_ReprocessingRequests_ReprocessingRequestId",
                table: "Resources");

            migrationBuilder.DropIndex(
                name: "IX_Resources_BuybackRequestId",
                table: "Resources");

            migrationBuilder.DropIndex(
                name: "IX_Resources_ReprocessingRequestId",
                table: "Resources");

            migrationBuilder.DropColumn(
                name: "BuybackRequestId",
                table: "Resources");

            migrationBuilder.DropColumn(
                name: "ReprocessingRequestId",
                table: "Resources");

            migrationBuilder.CreateTable(
                name: "ResourceOrders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResourceId = table.Column<int>(type: "int", nullable: false),
                    BuybackRequestId = table.Column<int>(type: "int", nullable: false),
                    ReprocessingRequestId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<double>(type: "float", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResourceOrders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ResourceOrders_BuyBackRequests_BuybackRequestId",
                        column: x => x.BuybackRequestId,
                        principalTable: "BuyBackRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ResourceOrders_ReprocessingRequests_ReprocessingRequestId",
                        column: x => x.ReprocessingRequestId,
                        principalTable: "ReprocessingRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ResourceOrders_Resources_ResourceId",
                        column: x => x.ResourceId,
                        principalTable: "Resources",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ResourceOrders_BuybackRequestId",
                table: "ResourceOrders",
                column: "BuybackRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_ResourceOrders_ReprocessingRequestId",
                table: "ResourceOrders",
                column: "ReprocessingRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_ResourceOrders_ResourceId",
                table: "ResourceOrders",
                column: "ResourceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ResourceOrders");

            migrationBuilder.AddColumn<int>(
                name: "BuybackRequestId",
                table: "Resources",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ReprocessingRequestId",
                table: "Resources",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Resources_BuybackRequestId",
                table: "Resources",
                column: "BuybackRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_Resources_ReprocessingRequestId",
                table: "Resources",
                column: "ReprocessingRequestId");

            migrationBuilder.AddForeignKey(
                name: "FK_Resources_BuyBackRequests_BuybackRequestId",
                table: "Resources",
                column: "BuybackRequestId",
                principalTable: "BuyBackRequests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Resources_ReprocessingRequests_ReprocessingRequestId",
                table: "Resources",
                column: "ReprocessingRequestId",
                principalTable: "ReprocessingRequests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
