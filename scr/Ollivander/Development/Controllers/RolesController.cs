using DatabaseModel;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Development.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class RolesController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public RolesController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpGet]
        [Authorize(Roles = "Admin, Analyst")]
        public IQueryable<IdentityRole> Get()
        {
            return _roleManager.Roles;
        }

        [HttpGet("{id}/{userId}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(string id, string userId)
        {
            User? user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NoContent();
            }

            if (id == userId)
            {
                var roles = await _userManager.GetRolesAsync(user);

                return Ok(new { Roles = roles });
            }
            else
            {
                var roles = await _userManager.GetRolesAsync(user);

                if (roles.Contains("Admin"))
                {
                    var userGuest = await _userManager.FindByIdAsync(userId);
                    roles = await _userManager.GetRolesAsync(userGuest);
                    return Ok(new { Roles = roles });
                }

                return Unauthorized();
            }
        }

        [HttpPost("{roleName}")]
        [Authorize(Roles = "Admin")]
        public async Task Post(string roleName)
        {
            if (!string.IsNullOrEmpty(roleName))
            {
                IdentityResult result = await _roleManager.CreateAsync(new IdentityRole(roleName));
                if (!result.Succeeded)
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(String.Empty, error.Description);
                    }
                }
            }
        }

        [HttpDelete("{roleName}")]
        [Authorize(Roles = "Admin")]
        public async Task Delete(string roleName)
        {
            IdentityRole role = await _roleManager.FindByNameAsync(roleName);

            if (role != null)
            {
                await _roleManager.DeleteAsync(role);
            }
        }
    }
}
