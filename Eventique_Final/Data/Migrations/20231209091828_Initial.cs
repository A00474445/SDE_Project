using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Eventique_Final.Data.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    EVENT_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HOST_USER_ID = table.Column<int>(type: "int", nullable: false),
                    EVENT_NAME = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    EVENT_DATE = table.Column<DateTime>(type: "datetime", nullable: false),
                    EVENT_TIME = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    EVENT_CATEGORY = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    EVENT_VENUE = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    EVENT_COST = table.Column<int>(type: "int", nullable: false),
                    EVENT_IMAGE = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    EVENT_DESCRIPTION = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.EVENT_ID);
                });

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    PAYMENT_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    USER_ID = table.Column<int>(type: "int", nullable: false),
                    EVENT_ID = table.Column<int>(type: "int", nullable: false),
                    FIRST_NAME = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LAST_NAME = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EMAIL = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PHONE_NUMBER = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CITY = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    STATE = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    COUNTRY = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    POSTAL_CODE = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CREDIT_CARD_NAME = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CREDIT_CARD_TYPE = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CREDIT_CARD_NUMBER = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CREDIT_CARD_EXPIRATION_DATE = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AMOUNT = table.Column<int>(type: "int", nullable: false),
                    LOGIN_CHECKIN_DATE = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PAYMENT_CHECKOUT_DATE = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.PAYMENT_ID);
                });

            migrationBuilder.CreateTable(
                name: "UserEvents",
                columns: table => new
                {
                    USER_EVENT_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    USER_ID = table.Column<int>(type: "int", nullable: false),
                    EVENT_ID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserEvents", x => x.USER_EVENT_ID);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    USER_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FULL_NAME = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    USER_NAME = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    USER_EMAIL = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    USER_PASSWORD = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    USER_PHONE = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    USER_ROLE = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    ISAPPROVED = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.USER_ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "UserEvents");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
