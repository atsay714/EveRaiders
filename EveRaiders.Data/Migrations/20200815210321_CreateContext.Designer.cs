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
    [Migration("20200815210321_CreateContext")]
    partial class CreateContext
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0-preview.7.20365.15");

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

            modelBuilder.Entity("EveRaiders.Data.Models.UniverseSystem", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .UseIdentityColumn();

                    b.Property<long?>("ConstellationId")
                        .HasColumnType("bigint");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ConstellationId");

                    b.ToTable("Systems");
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

            modelBuilder.Entity("EveRaiders.Data.Models.UniverseSystem", b =>
                {
                    b.HasOne("EveRaiders.Data.Models.Constellation", "Constellation")
                        .WithMany("Systems")
                        .HasForeignKey("ConstellationId");
                });
#pragma warning restore 612, 618
        }
    }
}
