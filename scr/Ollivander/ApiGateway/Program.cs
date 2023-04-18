using CustomAuthentication;
using Ocelot.Cache.CacheManager;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

namespace ApiGateway
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            string cors = builder.Configuration.GetValue<string>("Policy:cors");

            builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);
            builder.Services.AddOcelot(builder.Configuration).AddCacheManager(e => e.WithDictionaryHandle());
            builder.Services.AddCors(p => p.AddPolicy(cors, builder => builder.WithOrigins("http://localhost:5000").AllowAnyMethod().AllowAnyHeader()));
            builder.Services.AddAuthorization();
            builder.Services.AddCustomJwtAuthentication();

            var app = builder.Build();

            app.UseCors(cors);
            app.UseOcelot().Wait();

            app.UseAuthentication();
            app.UseAuthorization();

            app.Run();
        }
    }
}