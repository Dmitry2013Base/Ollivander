using Catalog.Context;
using DatabaseModel;
using Catalog.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Catalog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CatalogController : ControllerBase
    {
        private readonly DatabaseContext _databaseContext;

        public CatalogController(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("count/{category?}")]
        public int Get(string? category)
        {
            string? find = category;

            if (category == null)
            {
                find = _databaseContext.Categories!.First().Name;
            }
            else
            {
                var t = _databaseContext.Categories!.FirstOrDefault(e => e.Name == category);

                if (t == null)
                {
                    find = _databaseContext.Categories!.First().Name;
                }
            }

            return _databaseContext.Products!.Where(e => e.Category!.Name == find).Count();
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("Categories")]
        public IQueryable<string?> GetCategories()
        {
            return _databaseContext.Categories!.Select(e => e.Name);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("{category?}/{start}/{limit}")]
        public async Task<IQueryable<dynamic>> Get(string? category, int start, int limit)
        {
            Category? param = await _databaseContext.Categories!.FirstOrDefaultAsync(e => e.Name == category);

            if (param == null)
            {
                category = _databaseContext.Categories!.FirstOrDefault()!.Name;
            }

            var products = _databaseContext.Products!
                .Where(e => e.Category!.Name == category)
                .Select(e => new { e.Id, e.Name, e.Sale, e.Price, e.Rate, e.Image, e.Count })
                .OrderBy(e => e.Id)
                .Skip(start)
                .Take(limit);

            return products;
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult?> Get(int id)
        {
            var product = await _databaseContext.Products!
                .Select(e => new { e.Id, e.Name, e.Description, e.Image, e.Price, e.Sale, e.Rate, e.Count, Category = e.Category!.Name })
                .FirstOrDefaultAsync(e => e.Id == id);

            if (product == null)
            {
                return NoContent();
            }

            var infos = _databaseContext.ProductInfos!
                .Where(e => e.Product!.Id == product.Id)
                .Select(e => new { e.Id, e.Title, e.Value });

            return Ok(new
            {
                product?.Id,
                product?.Name,
                product?.Description,
                product?.Image,
                product?.Price,
                product?.Sale,
                product?.Rate,
                product?.Count,
                CategoryName = product?.Category,
                infos
            });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] ProductUp productUp)
        {
            Product? product = await _databaseContext.Products!.FirstOrDefaultAsync(e => e.Id == id);

            if (product == null)
            {
                product = new Product();
            }

            Category category;

            if (productUp.CategoryName == String.Empty)
            {
                category = await _databaseContext.Categories!.FirstAsync(e => e.Id == 1);
            }
            else
            {
                category = await _databaseContext.Categories!.FirstAsync(e => e.Name == productUp.CategoryName);
            }

            product.Name = productUp.Name;
            product.Description = productUp.Description;
            product.Image = productUp.Image;
            product.Category = category;
            product.Price = productUp.Price;
            product.Sale = productUp.Sale;
            product.Count = productUp.Count;

            _databaseContext.Products!.Update(product);
            _databaseContext.SaveChanges();

            var list = _databaseContext.ProductInfos!.Where(e => e.Product!.Id == product.Id).ToList();
            _databaseContext.ProductInfos!.RemoveRange(list);

            productUp.Infos?.RemoveAll(e => e.Title == String.Empty && e.Value == String.Empty);
            productUp.Infos?.ForEach(e => e.Product = product);

            _databaseContext.ProductInfos.UpdateRange(productUp.Infos!);
            _databaseContext.SaveChanges();

            return Ok(productUp);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            Product? product = await _databaseContext.Products!.FirstOrDefaultAsync(e => e.Id == id);
            if (product == null)
            {
                return NoContent();
            }

            var comments = _databaseContext.Comments!.Where(e => e.Product == product);
            var infos = _databaseContext.ProductInfos!.Where(e => e.Product == product);
            var collections = _databaseContext.UsersCollections!.Where(e => e.Product == product);
            var orders = _databaseContext.Orders!.Where(e => e.Product == product);

            _databaseContext.Orders!.RemoveRange(orders);
            _databaseContext.UsersCollections!.RemoveRange(collections);
            _databaseContext.Comments!.RemoveRange(comments);
            _databaseContext.ProductInfos!.RemoveRange(infos);
            _databaseContext.Products!.Remove(product);
            await _databaseContext.SaveChangesAsync();
            return Ok();
        }
    }
}
