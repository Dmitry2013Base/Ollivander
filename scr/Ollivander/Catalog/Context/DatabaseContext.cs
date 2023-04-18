using DatabaseModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Data;


namespace Catalog.Context
{
    public class DatabaseContext : IdentityDbContext<User>
    {
        private static readonly Random random = new Random();
        private const int productCount = 150;
        private const int orderCount = 200;
        private const int collectionCount = 10;
        private const int maxCommentCount = 3;

        public DbSet<Product>? Products { get; set; }
        public DbSet<Category>? Categories { get; set; }
        public DbSet<Comment>? Comments { get; set; }
        public DbSet<ProductInfo>? ProductInfos { get; set; }
        public DbSet<UserCollections>? UsersCollections { get; set; }
        public DbSet<Order>? Orders { get; set; }
        public DbSet<Status>? Statuses { get; set; }


        public DatabaseContext()
        {

        }

        public DatabaseContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            List<dynamic>? defaultUsers = new List<dynamic>()
            {
                new { Name = $"Admin", Roles = new List<string>() { $"Admin" } },
                new { Name = $"Guest", Roles = new List<string>() { $"Guest" } },
                new { Name = $"Analyst", Roles = new List<string>() { $"Analyst" } },
                new { Name = $"Manager", Roles = new List<string>() { $"Manager" } },
            };

            var rating = GetAverageRating();

            List<Status> statuses = CreateModel.statuses;
            List<dynamic> products = CreateProducts(rating);
            List<User> users = CreateUsers(defaultUsers);
            List<IdentityRole> roles = CreateModel.roles;

            builder.Entity<Status>().HasData(statuses);
            builder.Entity<Category>().HasData(CreateModel.categories);
            builder.Entity<Product>().HasData(products);
            builder.Entity<User>().HasData(users);
            builder.Entity<IdentityRole>().HasData(roles);
            builder.Entity<IdentityUserRole<string>>().HasData(GetUserRoles(roles, users, defaultUsers));
            builder.Entity<UserCollections>().HasData(GetUserCollections(products, users));
            builder.Entity<Comment>().HasData(GetComments(rating, products, users));
            builder.Entity<Order>().HasData(GetOrders(products, users));
            builder.Entity<ProductInfo>().HasData(GetList(products));
        }

        private List<IdentityUserRole<string>> GetUserRoles(List<IdentityRole> roles, List<User> users, List<dynamic>? defaultUsers = null)
        {
            List<IdentityUserRole<string>> userRoles = new List<IdentityUserRole<string>>();

            for (int i = 0; i < users.Count; i++)
            {
                if (defaultUsers != null)
                {
                    if (!defaultUsers.Select(r => r.Name).Contains(users[i].UserName))
                    {
                        userRoles.Add(new IdentityUserRole<string>() { UserId = users[i].Id, RoleId = roles[random.Next(0, roles.Count)].Id });
                    }
                }
                else
                {
                    userRoles.Add(new IdentityUserRole<string>() { UserId = users[i].Id, RoleId = roles[random.Next(0, roles.Count)].Id });
                }
            }

            if (defaultUsers != null)
            {
                for (int i = 0; i < defaultUsers.Count; i++)
                {
                    for (int j = 0; j < defaultUsers[i].Roles.Count; j++)
                    {
                        userRoles.Add(new IdentityUserRole<string>() { UserId = users.First(e => e.UserName == defaultUsers[i].Name).Id, RoleId = roles.First(e => e.Name == defaultUsers[i].Roles[j]).Id });
                    }
                }
            }

            return userRoles;
        }

        private List<dynamic> GetUserCollections(List<dynamic> products, List<User> users, int count = collectionCount)
        {
            List<dynamic> userCollections = new List<dynamic>();

            var collections = CreateModel.collections;

            for (int i = 0; i < count; i++)
            {
                userCollections.Add(new
                {
                    Id = userCollections.Count + 1,
                    Name = collections[random.Next(0, collections.Count)],
                    ProductId = random.Next(1, products.Count),
                    UserId = users[random.Next(0, users.Count)].Id,
                });
            }
            return userCollections;
        }

        private List<dynamic> GetComments(List<List<double>> rate, List<dynamic> products, List<User> users)
        {
            List<dynamic> comments = new List<dynamic>();

            for (int i = 0; i < products.Count; i++)
            {
                for (int j = 0; j < rate[i].Count; j++)
                {
                    dynamic comment = new
                    {
                        Id = comments.Count + 1,
                        Plus = CreateModel.commentText[random.Next(0, CreateModel.commentText.Count)],
                        Minus = CreateModel.commentText[random.Next(0, CreateModel.commentText.Count)],
                        Message = CreateModel.commentText[random.Next(0, CreateModel.commentText.Count)],
                        ProductId = products[i].Id,
                        UserId = users[j].Id,
                        Rate = rate[i][j],
                        Created = new DateOnly(random.Next(2000, 2026), random.Next(1, 13), random.Next(1, 29))
                    };

                    comments.Add(comment);
                }
            }

            return comments;
        }

        private List<dynamic> GetOrders(List<dynamic> products, List<User> users, int count = orderCount)
        {
            List<dynamic> orders = new List<dynamic>();

            for (int i = 0; i < count; i++)
            {
                int flag = random.Next(0, 2);

                DateOnly date = new DateOnly(random.Next(2000, 2026), random.Next(1, 13), random.Next(1, 29));

                orders.Add(new
                {
                    Id = orders.Count + 1,
                    UserId = users[random.Next(0, users.Count)].Id,
                    UserChangeId = users[random.Next(0, users.Count)].Id,
                    ProductId = random.Next(1, products.Count),
                    StatusId = CreateModel.statuses[random.Next(0, CreateModel.statuses.Count)].Id,
                    Price = Math.Round((decimal)random.Next(1000, 10001) / 100) * 100,
                    DateChange = date,
                    Comment = (flag == 1) ? CreateModel.orderComment[random.Next(0, CreateModel.orderComment.Count)] : null,
                    Created = new DateOnly(random.Next(2000, 2026), random.Next(1, 13), random.Next(1, 29))
                });
            }

            return orders;
        }

        private List<User> CreateUsers(List<dynamic>? defaultUsers = null)
        {
            var hasher = new PasswordHasher<User>();
            List<User> users = new List<User>();
            for (int i = 0; i < CreateModel.userNames.Count; i++)
            {
                User user = new User
                {
                    Id = $"{Guid.NewGuid()}",
                    UserName = $"{CreateModel.userNames[i]}",
                    NormalizedUserName = $"{CreateModel.userNames[i]}".ToUpper(),
                    SecurityStamp = string.Empty,
                    Created = new DateOnly(random.Next(2000, 2026), random.Next(1, 13), random.Next(1, 29))
                };

                user.PasswordHash = hasher.HashPassword(user, $"{CreateModel.userNames[i]}");
                users.Add(user);
            }

            if (defaultUsers != null)
            {
                for (int i = 0; i < defaultUsers.Count; i++)
                {
                    User user = new User
                    {
                        Id = $"{Guid.NewGuid()}",
                        UserName = $"{defaultUsers[i].Name}",
                        NormalizedUserName = $"{defaultUsers[i].Name}".ToUpper(),
                        SecurityStamp = string.Empty,
                        Created = new DateOnly(random.Next(2000, 2026), random.Next(1, 13), random.Next(1, 29))
                    };
                    user.PasswordHash = hasher.HashPassword(user, $"{defaultUsers[i].Name}");
                    users.Add(user);
                }
            }

            return users;
        }

        private List<object> CreateProducts(List<List<double>> rate, int count = productCount)
        {
            List<object> products = new List<object>();
            int num = 0;

            for (int i = 0; i < CreateModel.deathlyHallowsNames.Count; i++)
            {
                decimal price = Math.Ceiling((decimal)random.Next(1000, 10001) / 100) * 100;
                decimal sale = (random.Next(0, 2) == 1) ? Math.Ceiling((decimal)random.Next(500, (int)price)) : 0;

                dynamic deathlyHallow = new
                {
                    Id = ++num,
                    Name = CreateModel.deathlyHallowsNames[i],
                    Description = CreateModel.deathlyHallowsDescriptions[i],
                    Image = CreateModel.deathlyHallowsImages[i],
                    CategoryId = CreateModel.categories[1].Id,
                    Price = price,
                    Sale = sale,
                    Count = random.Next(1000, 10001),
                    Rate = (rate[num - 1].Count != 0) ? (double)rate[num - 1].Average() : (double)0,
                };

                products.Add(deathlyHallow);
            }

            for (int i = 0; i < CreateModel.boilersNames.Count; i++)
            {
                decimal price = Math.Ceiling((decimal)random.Next(1000, 10001) / 100) * 100;
                decimal sale = (random.Next(0, 2) == 1) ? Math.Ceiling((decimal)random.Next(500, (int)price)) : 0;

                dynamic boiler = new
                {
                    Id = ++num,
                    Name = CreateModel.boilersNames[i],
                    Description = CreateModel.boilersDescriptions[i],
                    Image = CreateModel.boilersImages[0],
                    CategoryId = CreateModel.categories[3].Id,
                    Price = price,
                    Sale = sale,
                    Count = random.Next(1000, 10001),
                    Rate = (rate[num - 1].Count != 0) ? (double)rate[num - 1].Average() : (double)0,
                };

                products.Add(boiler);
            }

            for (int i = 0; i < CreateModel.sweetsNames.Count; i++)
            {
                decimal price = Math.Ceiling((decimal)random.Next(1000, 10001) / 100) * 100;
                decimal sale = (random.Next(0, 2) == 1) ? Math.Ceiling((decimal)random.Next(500, (int)price)) : 0;

                dynamic sweets = new
                {
                    Id = ++num,
                    Name = CreateModel.sweetsNames[i],
                    Description = CreateModel.sweetsDescriptions[i],
                    Image = CreateModel.sweetsImages[0],
                    CategoryId = CreateModel.categories[4].Id,
                    Price = price,
                    Sale = sale,
                    Count = random.Next(1000, 10001),
                    Rate = (rate[num - 1].Count != 0) ? (double)rate[num - 1].Average() : (double)0,
                };

                products.Add(sweets);
            }

            for (int i = 0; i < CreateModel.broomstickNames.Count; i++)
            {
                decimal price = Math.Ceiling((decimal)random.Next(1000, 10001) / 100) * 100;
                decimal sale = (random.Next(0, 2) == 1) ? Math.Ceiling((decimal)random.Next(500, (int)price)) : 0;

                dynamic broomstick = new
                {
                    Id = ++num,
                    Name = CreateModel.broomstickNames[i],
                    Description = CreateModel.broomstickDescriptions[i],
                    Image = CreateModel.broomstickImages[random.Next(0, CreateModel.broomstickImages.Count)],
                    CategoryId = CreateModel.categories[2].Id,
                    Price = price,
                    Sale = sale,
                    Count = random.Next(1000, 10001),
                    Rate = (rate[num - 1].Count != 0) ? (double)rate[num - 1].Average() : (double)0,
                };

                products.Add(broomstick);
            }

            for (int i = 0; i < count - num; i++)
            {
                decimal price = Math.Ceiling((decimal)random.Next(1000, 10001) / 100) * 100;
                decimal sale = (random.Next(0, 2) == 1) ? Math.Ceiling((decimal)random.Next(500, (int)price)) : 0;

                dynamic product = new
                {
                    Id = ++num,
                    Name = CreateModel.wandNames[random.Next(0, CreateModel.wandNames.Count)],
                    Description = CreateModel.commentText[random.Next(0, CreateModel.commentText.Count)],
                    Image = CreateModel.wandImages[random.Next(0, CreateModel.wandImages.Count)],
                    CategoryId = CreateModel.categories[0].Id,
                    Price = price,
                    Sale = sale,
                    Count = random.Next(1000, 10001),
                    Rate = (rate[num - 1].Count != 0) ? (double)rate[num - 1].Average() : (double)0,
                };

                products.Add(product);
            }

            return products;
        }

        private List<List<double>> GetAverageRating(int productCount = productCount, int countMax = maxCommentCount)
        {
            List<List<double>> rating = new List<List<double>>();

            for (int i = 0; i < productCount; i++)
            {
                int count = random.Next(0, countMax);

                List<double> ratings = new List<double>();

                for (int j = 0; j < count; j++)
                {
                    ratings.Add(random.Next(1, 6));
                }

                rating.Add(ratings);
            }

            return rating;
        }

        private List<object> GetList(List<dynamic> products)
        {
            List<object> productInfos = new List<object>();

            for (int i = 0; i < products.Count; i++)
            {
                if (products[i].CategoryId == 1)
                {
                    productInfos.AddRange(new List<object>()
                    {
                        new { Id = productInfos.Count + 1, Title = "Древесина", Value = CreateModel.wood[random.Next(0, CreateModel.wood.Count)], ProductId = products[i].Id},
                        new { Id = productInfos.Count + 2, Title = "Сердцевина", Value = CreateModel.core[random.Next(0, CreateModel.core.Count)], ProductId = products[i].Id},
                        new { Id = productInfos.Count + 3, Title = "Сила", Value = random.Next(10, 101).ToString(), ProductId = products[i].Id},
                    });
                }
                else if (products[i].CategoryId == 2)
                {
                    if (products[i].Name == CreateModel.deathlyHallowsNames[0])
                    {
                        productInfos.AddRange(new List<object>()
                        {
                            new { Id = productInfos.Count + 1, Title = "Древесина", Value = CreateModel.wood[random.Next(0, CreateModel.wood.Count)], ProductId = products[i].Id},
                            new { Id = productInfos.Count + 2, Title = "Сердцевина", Value = CreateModel.core[random.Next(0, CreateModel.core.Count)], ProductId = products[i].Id},
                            new { Id = productInfos.Count + 3, Title = "Сила", Value = random.Next(100, 151).ToString(), ProductId = products[i].Id},
                        });
                    }
                    else if (products[i].Name == CreateModel.deathlyHallowsNames[1])
                    {
                        productInfos.AddRange(new List<object>()
                        {
                            new { Id = productInfos.Count + 1, Title = "Кол-во использований", Value = random.Next(100, 151).ToString(), ProductId = products[i].Id},
                        });
                    }
                    else if (products[i].Name == CreateModel.deathlyHallowsNames[2])
                    {
                        productInfos.AddRange(new List<object>()
                        {
                            new { Id = productInfos.Count + 1, Title = "Размер", Value = "Универсальный", ProductId = products[i].Id},
                            new { Id = productInfos.Count + 2, Title = "Ткань", Value = "Лёгкая, серебристая ткань", ProductId = products[i].Id},
                            new { Id = productInfos.Count + 3, Title = "Особенность", Value = "Неуязвима от заклинаний", ProductId = products[i].Id},
                        });
                    }
                }
                else if (products[i].CategoryId == 3)
                {
                    productInfos.AddRange(new List<object>()
                    {
                        new { Id = productInfos.Count + 1, Title = "Максимальная скорость", Value = $"{random.Next(50, 151)} км/ч", ProductId = products[i].Id},
                        new { Id = productInfos.Count + 2, Title = "Прочность", Value = random.Next(10, 101).ToString(), ProductId = products[i].Id},
                        new { Id = productInfos.Count + 3, Title = "Разгон с 0-100 км/ч", Value = $"{random.Next(3, 11)} с.", ProductId = products[i].Id},
                    });
                }
                else if (products[i].CategoryId == 4)
                {
                    productInfos.AddRange(new List<object>()
                    {
                        new { Id = productInfos.Count + 1, Title = "Объем", Value = $"{random.Next(50, 101)} литров", ProductId = products[i].Id},
                    });
                }
                else if (products[i].CategoryId == 5)
                {
                    productInfos.AddRange(new List<object>()
                    {
                        new { Id = productInfos.Count + 1, Title = "Вес", Value = $"{random.Next(0, 51)} г", ProductId = products[i].Id},
                        new { Id = productInfos.Count + 2, Title = "Калорийность", Value = $"{random.Next(50, 251)} ккал", ProductId = products[i].Id},
                    });
                }
            }

            return productInfos;
        }
    }
}
