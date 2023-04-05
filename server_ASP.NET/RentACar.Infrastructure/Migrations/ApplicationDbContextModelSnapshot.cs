﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RentACar.Infrastructure.Data;

#nullable disable

namespace RentACar.Infrastructure.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

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

                    b.ToTable("AspNetRoles", (string)null);

                    b.HasData(
                        new
                        {
                            Id = "d86dba5034324ec481562264fecc1d3b",
                            ConcurrencyStamp = "ad3b1b61-0332-4bd5-9a7b-c147ac78f17e",
                            Name = "Dealer",
                            NormalizedName = "DEALER"
                        },
                        new
                        {
                            Id = "5af4facac8424694b91c57854ab6b598",
                            ConcurrencyStamp = "fc67cdcc-2057-4ef6-ab00-6f929c086ff0",
                            Name = "Renter",
                            NormalizedName = "RENTER"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
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

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);

                    b.HasData(
                        new
                        {
                            UserId = "d3211a8d-efde-4a19-8087-79cde4679276",
                            RoleId = "d86dba5034324ec481562264fecc1d3b"
                        },
                        new
                        {
                            UserId = "c6e570fd-d889-4a67-a36a-0ecbe758bc2c",
                            RoleId = "5af4facac8424694b91c57854ab6b598"
                        });
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

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("RentACar.Domain.Entitites.Car", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("AirCondition")
                        .HasColumnType("bit");

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<decimal>("DailyRate")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("DealerId")
                        .HasColumnType("int");

                    b.Property<int>("Doors")
                        .HasColumnType("int");

                    b.Property<int>("Fuel")
                        .HasColumnType("int");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsAvailable")
                        .HasColumnType("bit");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Make")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<int>("MakeYear")
                        .HasColumnType("int");

                    b.Property<string>("Model")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<bool>("NavigationSystem")
                        .HasColumnType("bit");

                    b.Property<string>("RegNumber")
                        .IsRequired()
                        .HasMaxLength(8)
                        .HasColumnType("nvarchar(8)");

                    b.Property<int>("Seats")
                        .HasColumnType("int");

                    b.Property<int>("Transmission")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("DealerId");

                    b.ToTable("Cars");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            AirCondition = true,
                            CategoryId = 3,
                            DailyRate = 40m,
                            DealerId = 1,
                            Doors = 5,
                            Fuel = 1,
                            ImageUrl = "https://images.dealer.com/autodata/us/640/color/2022/USD20TOC041A0/209.jpg?_returnflight_id=091119126",
                            IsAvailable = true,
                            IsDeleted = false,
                            Make = "Toyota",
                            MakeYear = 2022,
                            Model = "Corolla",
                            NavigationSystem = false,
                            RegNumber = "B1234AB",
                            Seats = 5,
                            Transmission = 2
                        },
                        new
                        {
                            Id = 2,
                            AirCondition = true,
                            CategoryId = 1,
                            DailyRate = 33m,
                            DealerId = 1,
                            Doors = 5,
                            Fuel = 0,
                            ImageUrl = "https://s7g10.scene7.com/is/image/hyundaiautoever/BC3_5DR_TopTrim_DG01-01_EXT_front_rgb_v01_w3a-1:4x3?wid=960&hei=720&fmt=png-alpha&fit=wrap,1",
                            IsAvailable = true,
                            IsDeleted = false,
                            Make = "Hundai",
                            MakeYear = 2022,
                            Model = "i20",
                            NavigationSystem = false,
                            RegNumber = "B1444CB",
                            Seats = 5,
                            Transmission = 1
                        },
                        new
                        {
                            Id = 3,
                            AirCondition = true,
                            CategoryId = 2,
                            DailyRate = 37m,
                            DealerId = 1,
                            Doors = 5,
                            Fuel = 3,
                            ImageUrl = "https://www.citroen-eg.com/wp-content/uploads/2021/11/Polar-White-front1.jpg",
                            IsAvailable = true,
                            IsDeleted = false,
                            Make = "Citroen",
                            MakeYear = 2022,
                            Model = "C4",
                            NavigationSystem = false,
                            RegNumber = "B1223AB",
                            Seats = 5,
                            Transmission = 1
                        });
                });

            modelBuilder.Entity("RentACar.Domain.Entitites.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CategoryName")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Categories");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CategoryName = "Economy",
                            IsDeleted = false
                        },
                        new
                        {
                            Id = 2,
                            CategoryName = "Compact",
                            IsDeleted = false
                        },
                        new
                        {
                            Id = 3,
                            CategoryName = "Intermediate",
                            IsDeleted = false
                        },
                        new
                        {
                            Id = 4,
                            CategoryName = "Passenger Van",
                            IsDeleted = false
                        },
                        new
                        {
                            Id = 5,
                            CategoryName = "Electric",
                            IsDeleted = false
                        },
                        new
                        {
                            Id = 6,
                            CategoryName = "Intermediate SUV",
                            IsDeleted = false
                        },
                        new
                        {
                            Id = 7,
                            CategoryName = "Luxury",
                            IsDeleted = false
                        });
                });

            modelBuilder.Entity("RentACar.Domain.Entitites.Dealer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(75)
                        .HasColumnType("nvarchar(75)");

                    b.Property<string>("ApplicationUserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CompanyName")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("CompanyNumber")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("Id");

                    b.ToTable("Dealers");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Address = "Sofia, Bulgaria, 1000, West Park",
                            ApplicationUserId = "d3211a8d-efde-4a19-8087-79cde4679276",
                            CompanyName = "TopCars",
                            CompanyNumber = "12345674"
                        });
                });

            modelBuilder.Entity("RentACar.Domain.Entitites.Identity.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("DealerId")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

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

                    b.Property<int?>("RenterId")
                        .HasColumnType("int");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("DealerId")
                        .IsUnique()
                        .HasFilter("[DealerId] IS NOT NULL");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.HasIndex("RenterId")
                        .IsUnique()
                        .HasFilter("[RenterId] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);

                    b.HasData(
                        new
                        {
                            Id = "d3211a8d-efde-4a19-8087-79cde4679276",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "969cf910-954f-48ea-ae83-2b3fe1cd8e56",
                            DealerId = 1,
                            Email = "admin@gmail.com",
                            EmailConfirmed = false,
                            FirstName = "Peter",
                            LastName = "Parker",
                            LockoutEnabled = false,
                            NormalizedEmail = "ADMIN@GMAIL.COM",
                            NormalizedUserName = "ADMIN",
                            PasswordHash = "AQAAAAEAACcQAAAAEJVdeaZ8LVU4Y0FJMUS0eQwN+CN64zFfI6tNHo0eVoAJXfPDWTFort6wQT0t89pElQ==",
                            PhoneNumber = "1234567890",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "669a49bf-bfcf-41f6-aca6-d8f8a64f6ae8",
                            TwoFactorEnabled = false,
                            UserName = "Admin"
                        },
                        new
                        {
                            Id = "c6e570fd-d889-4a67-a36a-0ecbe758bc2c",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "bb6b564d-fc92-457a-80df-3f5a0a4ded7b",
                            Email = "user@mail.com",
                            EmailConfirmed = false,
                            FirstName = "Peter",
                            LastName = "Brown",
                            LockoutEnabled = false,
                            NormalizedEmail = "USER@GMAIL.COM",
                            NormalizedUserName = "USER1",
                            PasswordHash = "AQAAAAEAACcQAAAAEFOa5FfnoB+Ab5ZuKF5m0sqP3c/tL2glh1CBQtfHD59rSBk2XeeQHKNo2BgXY324TA==",
                            PhoneNumber = "1234567890",
                            PhoneNumberConfirmed = false,
                            RenterId = 1,
                            SecurityStamp = "f6f03e98-dabf-4b68-bec0-32ecf1d446aa",
                            TwoFactorEnabled = false,
                            UserName = "User1"
                        });
                });

            modelBuilder.Entity("RentACar.Domain.Entitites.Location", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("LocationName")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.HasKey("Id");

                    b.ToTable("Locations");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Address = "Bulgaria, Varna, 9000",
                            IsDeleted = false,
                            LocationName = "Varna Center"
                        },
                        new
                        {
                            Id = 2,
                            Address = "Bulgaria, Varna, 9000",
                            IsDeleted = false,
                            LocationName = "Varna Airport"
                        },
                        new
                        {
                            Id = 3,
                            Address = "Bulgaria, Sofia, 1000",
                            IsDeleted = false,
                            LocationName = "Sofia Airport"
                        },
                        new
                        {
                            Id = 4,
                            Address = "Bulgaria, Sofia, 1000",
                            IsDeleted = false,
                            LocationName = "Sofia Center"
                        },
                        new
                        {
                            Id = 5,
                            Address = "Bulgaria, Burgas",
                            IsDeleted = false,
                            LocationName = "Burgas Airport"
                        });
                });

            modelBuilder.Entity("RentACar.Domain.Entitites.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CarId")
                        .HasColumnType("int");

                    b.Property<DateTime>("DropOffDateAndTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("DropOffLocationId")
                        .HasColumnType("int");

                    b.Property<int>("Duration")
                        .HasColumnType("int");

                    b.Property<string>("Insurance")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<bool>("IsPaid")
                        .HasColumnType("bit");

                    b.Property<int>("PaymentType")
                        .HasColumnType("int");

                    b.Property<DateTime>("PickUpDateAndTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("PickUpLocationId")
                        .HasColumnType("int");

                    b.Property<int>("RenterId")
                        .HasColumnType("int");

                    b.Property<decimal>("TotalAmount")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("CarId");

                    b.HasIndex("DropOffLocationId");

                    b.HasIndex("PickUpLocationId");

                    b.HasIndex("RenterId");

                    b.ToTable("Orders");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CarId = 3,
                            DropOffDateAndTime = new DateTime(2022, 11, 23, 6, 0, 0, 0, DateTimeKind.Unspecified),
                            DropOffLocationId = 1,
                            Duration = 6,
                            IsActive = true,
                            IsDeleted = false,
                            IsPaid = false,
                            PaymentType = 1,
                            PickUpDateAndTime = new DateTime(2022, 11, 17, 5, 0, 0, 0, DateTimeKind.Unspecified),
                            PickUpLocationId = 1,
                            RenterId = 1,
                            TotalAmount = 292m
                        },
                        new
                        {
                            Id = 2,
                            CarId = 2,
                            DropOffDateAndTime = new DateTime(2022, 11, 20, 5, 0, 0, 0, DateTimeKind.Unspecified),
                            DropOffLocationId = 2,
                            Duration = 3,
                            IsActive = true,
                            IsDeleted = false,
                            IsPaid = false,
                            PaymentType = 2,
                            PickUpDateAndTime = new DateTime(2022, 11, 17, 3, 0, 0, 0, DateTimeKind.Unspecified),
                            PickUpLocationId = 1,
                            RenterId = 1,
                            TotalAmount = 114m
                        });
                });

            modelBuilder.Entity("RentACar.Domain.Entitites.Rating", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CarId")
                        .HasColumnType("int");

                    b.Property<int>("Rate")
                        .HasColumnType("int");

                    b.Property<int>("RenterId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CarId");

                    b.HasIndex("RenterId");

                    b.ToTable("Ratings");
                });

            modelBuilder.Entity("RentACar.Domain.Entitites.Renter", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(75)
                        .HasColumnType("nvarchar(75)");

                    b.Property<int>("Age")
                        .HasMaxLength(20)
                        .HasColumnType("int");

                    b.Property<string>("ApplicationUserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DrivingLicenceNumber")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<DateTime>("ExpiredDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Renters");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Address = "Sofia, Bulgaria, Mladost 3",
                            Age = 26,
                            ApplicationUserId = "c6e570fd-d889-4a67-a36a-0ecbe758bc2c",
                            DrivingLicenceNumber = "12345674",
                            ExpiredDate = new DateTime(2025, 11, 17, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        });
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
                    b.HasOne("RentACar.Domain.Entitites.Identity.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("RentACar.Domain.Entitites.Identity.ApplicationUser", null)
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

                    b.HasOne("RentACar.Domain.Entitites.Identity.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("RentACar.Domain.Entitites.Identity.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("RentACar.Domain.Entitites.Car", b =>
                {
                    b.HasOne("RentACar.Domain.Entitites.Category", "Category")
                        .WithMany("Cars")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RentACar.Domain.Entitites.Dealer", "Dealer")
                        .WithMany("Cars")
                        .HasForeignKey("DealerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("Dealer");
                });

            modelBuilder.Entity("RentACar.Domain.Entitites.Identity.ApplicationUser", b =>
                {
                    b.HasOne("RentACar.Domain.Entitites.Dealer", "Dealer")
                        .WithOne("ApplicationUser")
                        .HasForeignKey("RentACar.Domain.Entitites.Identity.ApplicationUser", "DealerId");

                    b.HasOne("RentACar.Domain.Entitites.Renter", "Renter")
                        .WithOne("ApplicationUser")
                        .HasForeignKey("RentACar.Domain.Entitites.Identity.ApplicationUser", "RenterId");

                    b.Navigation("Dealer");

                    b.Navigation("Renter");
                });

            modelBuilder.Entity("RentACar.Domain.Entitites.Order", b =>
                {
                    b.HasOne("RentACar.Domain.Entitites.Car", "Car")
                        .WithMany("Orders")
                        .HasForeignKey("CarId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("RentACar.Domain.Entitites.Location", "DropOffLocation")
                        .WithMany("DropOffLocations")
                        .HasForeignKey("DropOffLocationId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("RentACar.Domain.Entitites.Location", "PickUpLocation")
                        .WithMany("PickUpLocations")
                        .HasForeignKey("PickUpLocationId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("RentACar.Domain.Entitites.Renter", "Renter")
                        .WithMany("Orders")
                        .HasForeignKey("RenterId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Car");

                    b.Navigation("DropOffLocation");

                    b.Navigation("PickUpLocation");

                    b.Navigation("Renter");
                });

            modelBuilder.Entity("RentACar.Domain.Entitites.Rating", b =>
                {
                    b.HasOne("RentACar.Domain.Entitites.Car", "Car")
                        .WithMany("Ratings")
                        .HasForeignKey("CarId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RentACar.Domain.Entitites.Renter", "Renter")
                        .WithMany("Reatings")
                        .HasForeignKey("RenterId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Car");

                    b.Navigation("Renter");
                });

            modelBuilder.Entity("RentACar.Domain.Entitites.Car", b =>
                {
                    b.Navigation("Orders");

                    b.Navigation("Ratings");
                });

            modelBuilder.Entity("RentACar.Domain.Entitites.Category", b =>
                {
                    b.Navigation("Cars");
                });

            modelBuilder.Entity("RentACar.Domain.Entitites.Dealer", b =>
                {
                    b.Navigation("ApplicationUser")
                        .IsRequired();

                    b.Navigation("Cars");
                });

            modelBuilder.Entity("RentACar.Domain.Entitites.Location", b =>
                {
                    b.Navigation("DropOffLocations");

                    b.Navigation("PickUpLocations");
                });

            modelBuilder.Entity("RentACar.Domain.Entitites.Renter", b =>
                {
                    b.Navigation("ApplicationUser")
                        .IsRequired();

                    b.Navigation("Orders");

                    b.Navigation("Reatings");
                });
#pragma warning restore 612, 618
        }
    }
}