using DatabaseModel;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Payment.Context;
using Payment.Models;

namespace Payment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class PaymentController : ControllerBase
    {
        private readonly DatabaseContext _databaseContext;
        private readonly UserManager<User> _userManager;


        public PaymentController(DatabaseContext databaseContext, UserManager<User> userManager)
        {
            _databaseContext = databaseContext;
            _userManager = userManager;
        }


        [HttpGet]
        [Route("statuses")]
        public IEnumerable<string?> Get()
        {
            return _databaseContext.Statuses!.Select(e => e.Name);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult> Get(int id)
        {
            var order = await _databaseContext.Orders!
                .Select(e => new 
                { 
                    e.Id,
                    e.Created,
                    e.DateChange,
                    e.Comment,
                    e.User!.UserName,
                    ProductName = e.Product!.Name,
                    ProductPrice = e.Price,
                    StatusName = e.Status!.Name,
                    UserChange = e.UserChange!.UserName })
                .FirstOrDefaultAsync(e => e.Id == id);

            if (order == null)
            {
                return NoContent();
            }

            return Ok(new
            {
                order.Id,
                order.Created,
                order.DateChange,
                order.Comment,
                order?.UserName,
                order?.ProductName,
                order?.ProductPrice,
                statusName = order?.StatusName,
                userChange = order?.UserChange,
            });
        }

        [HttpPost]
        [Route("view")]
        public IEnumerable<dynamic?> Get([FromBody] List<int> products)
        {
            return _databaseContext.Products!
                .Where(e => products.Contains(e.Id))
                .Select(e => new { e.Id, e.Name, e.Image, Price = e.Price - e.Sale });
        }

        [HttpGet]
        [Route("{statusName}/{userName?}")]
        public async Task<IEnumerable<dynamic>> Get(string statusName, string? userName)
        {
            Status? status = await _databaseContext.Statuses!.FirstOrDefaultAsync(e => e.Name == statusName);

            if (status == null)
            {
                status = await _databaseContext.Statuses!.FirstOrDefaultAsync();
            }

            var orders = _databaseContext.Orders!
                .Where(e => e.Status == status)
                .OrderBy(e => e.Id)
                .Select(e => new 
                { 
                    e.Id,
                    e.Created,
                    e.User!.UserName,
                    productName = e.Product!.Name,
                    e.Status!.Name,
                    StatusName = e.Status.Name,
                    UserChange = e.UserChange!.UserName ,
                    e.Comment
                });

            if (userName != null)
            {
                orders = orders.Where(e => e.UserName == userName);
            }

            return orders;
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] OrderBy orderBuy)
        {
            User? user = await _userManager.FindByIdAsync(orderBuy.User?.Id);
            List<Product> products = _databaseContext.Products!.Where(e => orderBuy.ProductsId!.Contains(e.Id)).ToList();
            List<Order> orders = new ();

            if (user != null && Pay.Payment(orderBuy.CardNumber, orderBuy.CardMonth, orderBuy.CardYear, orderBuy.CardCode))
            {
                for (int i = 0; i < products.Count; i++)
                {
                    var now = DateTime.Now;

                    if (products[i].Count != 0)
                    {
                        Order order = new Order()
                        {
                            User = user,
                            Product = products[i],
                            Price = products[i].Price - products[i].Sale,
                            Status = await _databaseContext.Statuses!.FirstAsync(e => e.Id == 1),
                            DateChange = new DateOnly(now.Year, now.Month, now.Day),
                            Created = new DateOnly(now.Year, now.Month, now.Day),
                        };

                        products[i].Count -= 1;
                        orders.Add(order);
                    }
                }

                await _databaseContext.Orders!.AddRangeAsync(orders);
                _databaseContext.Products!.UpdateRange(products);
                await _databaseContext.SaveChangesAsync();
                return Ok();
            }
            return BadRequest();
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin, Manager")]
        public async Task<ActionResult> Put(int id, [FromBody] OrderUp orderUp)
        {
            User? user = await _userManager.FindByNameAsync(orderUp.UserChange);
            Order? order = await _databaseContext.Orders!.FirstOrDefaultAsync(e => e.Id == id);
            Status? status = await _databaseContext.Statuses!.FirstOrDefaultAsync(e => e.Name == orderUp.StatusName);
            bool statusUpdate = (order?.Status?.Name != status?.Name) ? true : false;

            if (user != null && order != null && status != null)
            {
                var now = DateTime.Now;
                order.Status = status;
                order.Comment = orderUp.Comment;
                order.DateChange = new DateOnly(now.Year, now.Month, now.Day);
                order.UserChange = user;

                _databaseContext.Orders!.Update(order);
                await _databaseContext.SaveChangesAsync();
                return Ok(statusUpdate);            
            }
            return BadRequest();
        }
    }
}
