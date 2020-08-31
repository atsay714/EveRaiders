using Microsoft.EntityFrameworkCore.Migrations;

namespace EveRaiders.Data.Migrations
{
    public partial class EnablingNullForeignKeys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ResourceOrders_BuyBackRequests_BuybackRequestId",
                table: "ResourceOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_ResourceOrders_ReprocessingRequests_ReprocessingRequestId",
                table: "ResourceOrders");

            migrationBuilder.AlterColumn<int>(
                name: "ReprocessingRequestId",
                table: "ResourceOrders",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "BuybackRequestId",
                table: "ResourceOrders",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_ResourceOrders_BuyBackRequests_BuybackRequestId",
                table: "ResourceOrders",
                column: "BuybackRequestId",
                principalTable: "BuyBackRequests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ResourceOrders_ReprocessingRequests_ReprocessingRequestId",
                table: "ResourceOrders",
                column: "ReprocessingRequestId",
                principalTable: "ReprocessingRequests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ResourceOrders_BuyBackRequests_BuybackRequestId",
                table: "ResourceOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_ResourceOrders_ReprocessingRequests_ReprocessingRequestId",
                table: "ResourceOrders");

            migrationBuilder.AlterColumn<int>(
                name: "ReprocessingRequestId",
                table: "ResourceOrders",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "BuybackRequestId",
                table: "ResourceOrders",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ResourceOrders_BuyBackRequests_BuybackRequestId",
                table: "ResourceOrders",
                column: "BuybackRequestId",
                principalTable: "BuyBackRequests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ResourceOrders_ReprocessingRequests_ReprocessingRequestId",
                table: "ResourceOrders",
                column: "ReprocessingRequestId",
                principalTable: "ReprocessingRequests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
