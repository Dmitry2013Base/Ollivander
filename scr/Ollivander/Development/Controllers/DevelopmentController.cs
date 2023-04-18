using DatabaseModel;
using Development.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Development.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin, Analyst")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class DevelopmentController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public DevelopmentController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpGet]
        public IQueryable<dynamic> Get()
        {
            return _userManager.Users.Select(e => new { e.Id, e.UserName });
        }

        [HttpGet("{userId}")]
        public async Task<User> Get(string userId)
        {
            return await _userManager.FindByIdAsync(userId);
        }

        [HttpPut]
        public async Task Put([FromBody] UserUpdate userUpdate)
        {
            User? user = await _userManager.FindByIdAsync(userUpdate.UserId);

            if (user == null)
            {
                return;
            }

            IdentityRole role = await _roleManager.FindByNameAsync(userUpdate.RoleName);

            if (role == null)
            {
                return;
            }

            if (userUpdate.AddOrRemove)
            {
                await _userManager.AddToRoleAsync(user, role.Name);
            }
            else
            {
                await _userManager.RemoveFromRoleAsync(user, role.Name);
            } 
        }
    }
}
