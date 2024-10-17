using Device_ManagementAPI;
using Device_ManagementAPI.Devices.Features.Handlers;
using Device_ManagementAPI.Devices.Features.Repository;
using Device_ManagementAPI.Devices.Jwt;
using Device_ManagementAPI.Devices.UserRepository;
using Device_ManagementAPI.Models;
//using Device_ManagementAPI.Service;
using Device_ManagementAPI.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var provider = builder.Services.BuildServiceProvider();
var configuration = provider.GetRequiredService<IConfiguration>();

// Add services to the container.
builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDbSettings"));

//dependaci injection
//// Register the IUserRepository with its implementation
builder.Services.AddScoped<IUserRepository, UserRepository>();
// Register the IOrderRepository with its implementation
builder.Services.AddTransient<IOrderRepository, OrderRepository>();
// Register the IJwtService with its implementation
builder.Services.AddScoped<IJwtService, JwtService>();
//builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<UpdateOrderCommandHandler>());
// Correct way to add MediatR
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder
            .WithOrigins("http://localhost:3000") // URL of your React app
            .AllowAnyHeader()
            .AllowAnyMethod());
});


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");

app.UseHttpsRedirection();

// Use authentication and authorization
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

