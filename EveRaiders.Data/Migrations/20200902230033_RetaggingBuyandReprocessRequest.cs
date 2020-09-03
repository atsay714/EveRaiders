using Microsoft.EntityFrameworkCore.Migrations;

namespace EveRaiders.Data.Migrations
{
    public partial class RetaggingBuyandReprocessRequest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BuyBackRequests_AspNetUsers_UserId",
                table: "BuyBackRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_ReprocessingRequests_AspNetUsers_UserId",
                table: "ReprocessingRequests");

            migrationBuilder.DropIndex(
                name: "IX_ReprocessingRequests_UserId",
                table: "ReprocessingRequests");

            migrationBuilder.DropIndex(
                name: "IX_BuyBackRequests_UserId",
                table: "BuyBackRequests");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "ReprocessingRequests");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "BuyBackRequests");

            migrationBuilder.AddColumn<int>(
                name: "PilotId",
                table: "ReprocessingRequests",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PilotId",
                table: "BuyBackRequests",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ReprocessingRequests_PilotId",
                table: "ReprocessingRequests",
                column: "PilotId");

            migrationBuilder.CreateIndex(
                name: "IX_BuyBackRequests_PilotId",
                table: "BuyBackRequests",
                column: "PilotId");

            migrationBuilder.AddForeignKey(
                name: "FK_BuyBackRequests_PilotNames_PilotId",
                table: "BuyBackRequests",
                column: "PilotId",
                principalTable: "PilotNames",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ReprocessingRequests_PilotNames_PilotId",
                table: "ReprocessingRequests",
                column: "PilotId",
                principalTable: "PilotNames",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BuyBackRequests_PilotNames_PilotId",
                table: "BuyBackRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_ReprocessingRequests_PilotNames_PilotId",
                table: "ReprocessingRequests");

            migrationBuilder.DropIndex(
                name: "IX_ReprocessingRequests_PilotId",
                table: "ReprocessingRequests");

            migrationBuilder.DropIndex(
                name: "IX_BuyBackRequests_PilotId",
                table: "BuyBackRequests");

            migrationBuilder.DropColumn(
                name: "PilotId",
                table: "ReprocessingRequests");

            migrationBuilder.DropColumn(
                name: "PilotId",
                table: "BuyBackRequests");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "ReprocessingRequests",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "BuyBackRequests",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ReprocessingRequests_UserId",
                table: "ReprocessingRequests",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_BuyBackRequests_UserId",
                table: "BuyBackRequests",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_BuyBackRequests_AspNetUsers_UserId",
                table: "BuyBackRequests",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ReprocessingRequests_AspNetUsers_UserId",
                table: "ReprocessingRequests",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
