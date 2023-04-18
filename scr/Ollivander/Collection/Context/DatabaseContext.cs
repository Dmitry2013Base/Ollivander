using DatabaseModel;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Collection.Context
{
    public class DatabaseContext : IdentityDbContext<User>
    {
        public DbSet<UserCollections>? UsersCollections { get; set; }
        public DbSet<Product>? Products { get; set; }

        public DatabaseContext()
        {

        }

        public DatabaseContext(DbContextOptions options) : base(options)
        {
            
        }
    }
}
