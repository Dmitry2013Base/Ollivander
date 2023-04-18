using Collection.Context;
using DatabaseModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Collection.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CollectionController : ControllerBase
    {
        private readonly DatabaseContext _databaseContext;
        private readonly UserManager<User> _userManager;

        public CollectionController(DatabaseContext databaseContext, UserManager<User> userManager)
        {
            _databaseContext = databaseContext;
            _userManager = userManager;
        }

        [HttpGet("getCount/{userId}/{collectionName}")]
        public async Task<int?> GetCountItemsInCollection(string userId, string collectionName)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var collection = _databaseContext.UsersCollections!.Where(e => e.User == user && e.Name == collectionName);
            return collection?.Count();
        }

        [HttpGet("{collectionName}/{start?}/{limit?}/{userId}")]
        public async Task<IQueryable<Product?>> GetItemsInCollection(bool order, string collectionName, int start, int limit, string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var collection = _databaseContext.UsersCollections!.Where(e => e.User == user && e.Name == collectionName);

            return collection.Select(e => e.Product);
        }

        [HttpPost("{userId}/{collectionName}/{productId}")]
        public async Task Post(string userId, string collectionName, int productId)
        {
            await _databaseContext.UsersCollections!.AddAsync(new UserCollections() 
            { 
                Name = collectionName,
                User = await _userManager.FindByIdAsync(userId),
                Product = await _databaseContext.Products!.FirstOrDefaultAsync(e => e.Id == productId) 
            });
            await _databaseContext.SaveChangesAsync();
        }

        [HttpDelete("{userId}/{collectionName}/{productId}")]
        public async Task<ActionResult> Delete(string userId, string collectionName, int productId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var product = await _databaseContext.Products!.FirstOrDefaultAsync(e => e.Id == productId);
            var item = await _databaseContext.UsersCollections!.FirstOrDefaultAsync(e => e.Name == collectionName && e.User == user && e.Product == product);

            if (item == null)
            {
                return NoContent();
            }

            _databaseContext.UsersCollections!.Remove(item);
            await _databaseContext.SaveChangesAsync();
            return Ok();
        }
    }
}
