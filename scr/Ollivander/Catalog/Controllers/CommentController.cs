using Catalog.Context;
using DatabaseModel;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Catalog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CommentController : ControllerBase
    {
        private readonly DatabaseContext _databaseContext;
        private readonly UserManager<User> _userManager;

        public CommentController(DatabaseContext databaseContext, UserManager<User> userManager)
        {
            _databaseContext = databaseContext;
            _userManager = userManager;
        }

        [HttpGet("{productId}")]
        [AllowAnonymous]
        public IQueryable<dynamic> Get(int productId)
        {
            return _databaseContext.Comments!
                .Where(e => e.Product!.Id == productId)
                .OrderByDescending(e => e.Id)
                .Select(e => new { e.Id, e.Created, User = e.User!.UserName, e.Plus, e.Minus, e.Message, e.Rate });
        }

        [HttpPost("{productId}")]
        [Authorize]
        public async Task<ActionResult> Post([FromBody] Comment comment)
        {
            var product = _databaseContext.Products!.First(e => e.Id == comment.Product!.Id);
            comment.Product = product;
            comment.User = await _userManager.FindByNameAsync(comment?.User?.UserName);
            DateTime date = DateTime.Today;
            comment!.Created = new DateOnly(date.Year, date.Month, date.Day);

            var comments = _databaseContext.Comments!.Where(e => e.Product!.Id == comment!.Product.Id);

            if (comments.Select(e => e.User!.UserName).Contains(comment.User.UserName))
            {
                return BadRequest();
            }

            _databaseContext.Comments!.Add(comment!);
            var list = comments.ToList();
            list.Add(comment);
            product.Rate = list.Select(e => e.Rate).Average();
            _databaseContext.Update(product);
            _databaseContext.SaveChanges();

            return Ok(new { comment.Id, comment.Created, User = comment.User!.UserName, comment.Plus, comment.Minus, comment.Message, comment.Rate });
        }
    }
}
