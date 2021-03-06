﻿// <auto-generated />
using System;
using EveRaiders.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace EveRaiders.Data.Migrations
{
    [DbContext(typeof(EveRaidersContext))]
    [Migration("20200902230033_RetaggingBuyandReprocessRequest")]
    partial class RetaggingBuyandReprocessRequest
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0-preview.7.20365.15");

            modelBuilder.Entity("EveRaiders.Data.Authentication.PilotName", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("PilotNames");
                });

            modelBuilder.Entity("EveRaiders.Data.Authentication.RaiderUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<bool>("Approved")
                        .HasColumnType("bit");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DiscordUser")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("SuperAdmin")
                        .HasColumnType("bit");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("EveRaiders.Data.Models.BuySellRequest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int?>("PilotId")
                        .HasColumnType("int");

                    b.Property<DateTime>("RequestedAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<double>("TotalPrice")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("PilotId");

                    b.ToTable("BuySellRequests");
                });

            modelBuilder.Entity("EveRaiders.Data.Models.Constellation", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .UseIdentityColumn();

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("RegionId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("RegionId");

                    b.ToTable("Constellations");
                });

            modelBuilder.Entity("EveRaiders.Data.Models.Planet", b =>
                {
                    b.Property<long>("Id")
                        .HasColumnType("bigint");

                    b.Property<long>("EveOnlineId")
                        .HasColumnType("bigint");

                    b.Property<long>("EveOnlineTypeId")
                        .HasColumnType("bigint");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("SystemId")
                        .HasColumnType("bigint");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SystemId");

                    b.ToTable("Planets");
                });

            modelBuilder.Entity("EveRaiders.Data.Models.PlanetResource", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<double>("Output")
                        .HasColumnType("float");

                    b.Property<long?>("PlanetId")
                        .HasColumnType("bigint");

                    b.Property<int>("Richness")
                        .HasColumnType("int");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PlanetId");

                    b.ToTable("PlanetResources");
                });

            modelBuilder.Entity("EveRaiders.Data.Models.Region", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .UseIdentityColumn();

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Regions");
                });

            modelBuilder.Entity("EveRaiders.Data.Models.ReprocessingRequest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int?>("PilotId")
                        .HasColumnType("int");

                    b.Property<DateTime>("RequestedAt")
                        .HasColumnType("datetime2");

                    b.Property<double>("TotalPrice")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("PilotId");

                    b.ToTable("ReprocessingRequests");
                });

            modelBuilder.Entity("EveRaiders.Data.Models.Resource", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("Resources");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Lustering Alloy",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 2,
                            Name = "Sheen Compound",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 3,
                            Name = "Gleaming Alloy",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 4,
                            Name = "Condensed Alloy",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 5,
                            Name = "Precious Alloy",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 6,
                            Name = "Motley Compound",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 7,
                            Name = "Fiber Composite",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 8,
                            Name = "Lucent Compound",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 9,
                            Name = "Opulent Compound",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 10,
                            Name = "Glossy Compound",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 11,
                            Name = "Crystal Compound",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 12,
                            Name = "Dark Compound",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 13,
                            Name = "Reactive Gas",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 14,
                            Name = "Noble Gas",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 15,
                            Name = "Base Metals",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 16,
                            Name = "Heavy Metals",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 17,
                            Name = "Noble Metals",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 18,
                            Name = "Reactive Metals",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 19,
                            Name = "Toxic Metals",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 20,
                            Name = "Industrial Fibers",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 21,
                            Name = "Supertensile Plastics",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 22,
                            Name = "Polyaramids",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 23,
                            Name = "Coolant",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 24,
                            Name = "Condensates",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 25,
                            Name = "Construction Blocks",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 26,
                            Name = "Nanites",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 27,
                            Name = "Silicate Glass",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 28,
                            Name = "Smartfab Units",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 29,
                            Name = "Heavy Water",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 30,
                            Name = "Suspended Plasma",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 31,
                            Name = "Liquid Ozone",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 32,
                            Name = "Ionic Solutions",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 33,
                            Name = "Oxygen Isotopes",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 34,
                            Name = "Plasmoids",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 35,
                            Name = "Veldspar",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 36,
                            Name = "Scordite",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 37,
                            Name = "Pyroxeres",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 38,
                            Name = "Plagioclase",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 39,
                            Name = "Omber",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 40,
                            Name = "Kernite",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 41,
                            Name = "Jaspet",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 42,
                            Name = "Hemorphite",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 43,
                            Name = "Hedbergite",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 44,
                            Name = "Dark Orche",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 45,
                            Name = "Gneiss",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 46,
                            Name = "Crokite",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 47,
                            Name = "Spodanium",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 48,
                            Name = "Bistot",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 49,
                            Name = "Arkonor",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 50,
                            Name = "Mercoxit",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 51,
                            Name = "Tritanium",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 52,
                            Name = "Pyerite",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 53,
                            Name = "Mexallon",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 54,
                            Name = "Isogen",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 55,
                            Name = "Nocxium",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 56,
                            Name = "Zydrine",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 57,
                            Name = "Megacyte",
                            Price = 0.0
                        },
                        new
                        {
                            Id = 58,
                            Name = "Morphite",
                            Price = 0.0
                        });
                });

            modelBuilder.Entity("EveRaiders.Data.Models.ResourceOrder", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int?>("BuybackRequestId")
                        .HasColumnType("int");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<double>("Quantity")
                        .HasColumnType("float");

                    b.Property<int?>("ReprocessingRequestId")
                        .HasColumnType("int");

                    b.Property<int>("ResourceId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BuybackRequestId");

                    b.HasIndex("ReprocessingRequestId");

                    b.HasIndex("ResourceId");

                    b.ToTable("ResourceOrders");
                });

            modelBuilder.Entity("EveRaiders.Data.Models.UniverseSystem", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .UseIdentityColumn();

                    b.Property<long?>("ConstellationId")
                        .HasColumnType("bigint");

                    b.Property<long?>("DistanceFromBase")
                        .HasColumnType("bigint");

                    b.Property<long>("EveOnlineId")
                        .HasColumnType("bigint");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ConstellationId");

                    b.ToTable("Systems");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("EveRaiders.Data.Authentication.PilotName", b =>
                {
                    b.HasOne("EveRaiders.Data.Authentication.RaiderUser", "User")
                        .WithMany("PilotNames")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("EveRaiders.Data.Models.BuySellRequest", b =>
                {
                    b.HasOne("EveRaiders.Data.Authentication.PilotName", "Pilot")
                        .WithMany()
                        .HasForeignKey("PilotId");
                });

            modelBuilder.Entity("EveRaiders.Data.Models.Constellation", b =>
                {
                    b.HasOne("EveRaiders.Data.Models.Region", "Region")
                        .WithMany("Constellations")
                        .HasForeignKey("RegionId");
                });

            modelBuilder.Entity("EveRaiders.Data.Models.Planet", b =>
                {
                    b.HasOne("EveRaiders.Data.Models.UniverseSystem", "System")
                        .WithMany("Planets")
                        .HasForeignKey("SystemId");
                });

            modelBuilder.Entity("EveRaiders.Data.Models.PlanetResource", b =>
                {
                    b.HasOne("EveRaiders.Data.Models.Planet", "Planet")
                        .WithMany("Resources")
                        .HasForeignKey("PlanetId");
                });

            modelBuilder.Entity("EveRaiders.Data.Models.ReprocessingRequest", b =>
                {
                    b.HasOne("EveRaiders.Data.Authentication.PilotName", "Pilot")
                        .WithMany()
                        .HasForeignKey("PilotId");
                });

            modelBuilder.Entity("EveRaiders.Data.Models.ResourceOrder", b =>
                {
                    b.HasOne("EveRaiders.Data.Models.BuySellRequest", "BuySellRequest")
                        .WithMany("Resources")
                        .HasForeignKey("BuybackRequestId");

                    b.HasOne("EveRaiders.Data.Models.ReprocessingRequest", "ReprocessingRequest")
                        .WithMany("RawOres")
                        .HasForeignKey("ReprocessingRequestId");

                    b.HasOne("EveRaiders.Data.Models.Resource", "Resource")
                        .WithMany("Orders")
                        .HasForeignKey("ResourceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("EveRaiders.Data.Models.UniverseSystem", b =>
                {
                    b.HasOne("EveRaiders.Data.Models.Constellation", "Constellation")
                        .WithMany("Systems")
                        .HasForeignKey("ConstellationId");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("EveRaiders.Data.Authentication.RaiderUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("EveRaiders.Data.Authentication.RaiderUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EveRaiders.Data.Authentication.RaiderUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("EveRaiders.Data.Authentication.RaiderUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
