﻿// <auto-generated />
using System;
using Eventique_Final.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Eventique_Final.Data.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.24")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Eventique_Final.Data.Models.Event", b =>
                {
                    b.Property<int>("EVENT_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("EVENT_ID"), 1L, 1);

                    b.Property<string>("EVENT_CATEGORY")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("nvarchar(150)");

                    b.Property<int>("EVENT_COST")
                        .HasColumnType("int");

                    b.Property<DateTime>("EVENT_DATE")
                        .HasColumnType("datetime2");

                    b.Property<string>("EVENT_DESCRIPTION")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("EVENT_IMAGE")
                        .IsRequired()
                        .HasMaxLength(300)
                        .HasColumnType("nvarchar(300)");

                    b.Property<string>("EVENT_NAME")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("nvarchar(150)");

                    b.Property<string>("EVENT_TIME")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("nvarchar(15)");

                    b.Property<string>("EVENT_VENUE")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("nvarchar(150)");

                    b.Property<int>("HOST_USER_ID")
                        .HasColumnType("int");

                    b.HasKey("EVENT_ID");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("Eventique_Final.Data.Models.Payment", b =>
                {
                    b.Property<int>("PAYMENT_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PAYMENT_ID"), 1L, 1);

                    b.Property<int>("AMOUNT")
                        .HasColumnType("int");

                    b.Property<string>("CITY")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("COUNTRY")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CREDIT_CARD_EXPIRATION_DATE")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CREDIT_CARD_NAME")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CREDIT_CARD_NUMBER")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CREDIT_CARD_TYPE")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EMAIL")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("EVENT_ID")
                        .HasColumnType("int");

                    b.Property<string>("FIRST_NAME")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LAST_NAME")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LOGIN_CHECKIN_DATE")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PAYMENT_CHECKOUT_DATE")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PHONE_NUMBER")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("POSTAL_CODE")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("STATE")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("USER_ID")
                        .HasColumnType("int");

                    b.HasKey("PAYMENT_ID");

                    b.ToTable("Payments");
                });

            modelBuilder.Entity("Eventique_Final.Data.Models.User", b =>
                {
                    b.Property<int>("USER_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("USER_ID"), 1L, 1);

                    b.Property<string>("FULL_NAME")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("nvarchar(150)");

                    b.Property<int>("ISAPPROVED")
                        .HasColumnType("int");

                    b.Property<string>("USER_EMAIL")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("nvarchar(150)");

                    b.Property<string>("USER_NAME")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("nvarchar(150)");

                    b.Property<string>("USER_PASSWORD")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("nvarchar(150)");

                    b.Property<string>("USER_PHONE")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("nvarchar(150)");

                    b.Property<string>("USER_ROLE")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("nvarchar(150)");

                    b.HasKey("USER_ID");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Eventique_Final.Data.Models.User_Event", b =>
                {
                    b.Property<int>("USER_EVENT_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("USER_EVENT_ID"), 1L, 1);

                    b.Property<int>("EVENT_ID")
                        .HasColumnType("int");

                    b.Property<int>("USER_ID")
                        .HasColumnType("int");

                    b.HasKey("USER_EVENT_ID");

                    b.ToTable("UserEvents");
                });
#pragma warning restore 612, 618
        }
    }
}
