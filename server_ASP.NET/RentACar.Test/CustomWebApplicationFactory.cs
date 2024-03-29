﻿using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RentACar.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentACar.Test
{
    public class CustomWebAplicationFactory<TProgram> : WebApplicationFactory<TProgram> where TProgram : class

    {
        private SqliteConnection _connection;
        public CustomWebAplicationFactory()
        {
            _connection = new SqliteConnection("DataSource =:memory:");
            _connection.Open();
        }
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                var descriptor = services.SingleOrDefault(
                    d => d.ServiceType ==
                        typeof(DbContextOptions<ApplicationDbContext>));

                services.Remove(descriptor);

                var serviceProvider = new ServiceCollection()
                .AddEntityFrameworkSqlite()
                .BuildServiceProvider();

                services.AddDbContext<ApplicationDbContext>(options =>
                {
                    options.UseSqlite(_connection);
                    options.UseInternalServiceProvider(serviceProvider);
                }, ServiceLifetime.Scoped);

                var sp = services.BuildServiceProvider();

                using (var scope = sp.CreateScope())
                {
                    var scopedServices = scope.ServiceProvider;
                    var db = scopedServices.GetRequiredService<ApplicationDbContext>();
                    db.Database.EnsureDeleted();

                    db.Database.EnsureCreated();

                    //Utilities.InitializeDbForTests(db);
                }
            });
        }
        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            _connection.Dispose();
            _connection.Close();
        }
    }
}
