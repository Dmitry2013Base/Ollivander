using Collection.Context;
using CustomAuthentication;
using DatabaseModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Collection
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            string? connection = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<DatabaseContext>(options => options.UseNpgsql(connection!));
            builder.Services.AddCustomJwtAuthentication();
            builder.Services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<DatabaseContext>();
            builder.Services.AddControllers();

            var app = builder.Build();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}