using DatabaseModel;
using Identity.Model;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Identity.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("login")]
        public async Task<AuthenticationResponse?> Login([FromBody] AuthenticationRequest authenticationRequest)
        {
            if (string.IsNullOrWhiteSpace(authenticationRequest.Login) || string.IsNullOrWhiteSpace(authenticationRequest.Password))
            {
                return null;
            }

            var loginResult = await _signInManager.PasswordSignInAsync(authenticationRequest.Login, authenticationRequest.Password, false, false);

            if (loginResult.Succeeded)
            {
                User user = await _userManager.FindByNameAsync(authenticationRequest.Login);

                if (user == null)
                {
                    return null;
                }

                IList<string> roles = await _userManager.GetRolesAsync(user);

                _ = int.TryParse(_configuration["JWT:RefreshTokenValidityInDays"], out int refreshTokenValidityInDays);

                var Access = GenerateAccessToken(user).Result;
                var refresh = GenerateRefreshToken();

                user.RefreshToken = refresh;

                var date = DateTime.Now.AddDays(refreshTokenValidityInDays);
                user.RefreshTokenExpiryTime = new DateOnly(date.Year, date.Month, date.Day);
                await _userManager.UpdateAsync(user);

                return new AuthenticationResponse()
                {
                    UserId = user.Id,
                    UserName = authenticationRequest.Login,
                    AccessToken = Access,
                    RefrechToken = refresh,
                    Time = user.RefreshTokenExpiryTime.ToString("yyyy-MM-dd"),
                    Roles = roles,
                };
            }
            return null;
        }

        [HttpPost]
        [Route("registration")]
        public async Task<ActionResult> Registration([FromBody] RegistrationRequest registrationRequest)
        {
            if (ModelState.IsValid)
            {
                if (registrationRequest.Password == registrationRequest.PasswordRepeat)
                {
                    var date = DateTime.Now;

                    User user = new User()
                    {
                        UserName = registrationRequest.Login,
                        Created = new DateOnly(date.Year, date.Month, date.Day),
                    };

                    var result = await _userManager.CreateAsync(user, registrationRequest.Password);

                    if (result.Succeeded)
                    {
                        await _signInManager.SignInAsync(user, false);
                        await _userManager.AddToRoleAsync(user, "Guest");
                        return Ok();
                    }
                }
            }
            return BadRequest();
        }

        [HttpPost]
        [Route("refrech")]
        public async Task<ActionResult> Refrech([FromBody] TokenModel tokenModel)
        {
            var principal = GetPrincipalFromExpiredToken(tokenModel.AccessToken);
            if (principal == null)
            {
                return BadRequest("Invalid access token or refresh token");
            }

            string? username = principal.Claims.ToList()[0].Value;
            var user = await _userManager.FindByNameAsync(username);


            var now = DateTime.Now;

            if (user == null || user.RefreshToken != user.RefreshToken || user.RefreshTokenExpiryTime <= new DateOnly(now.Year, now.Month, now.Day))
            {
                return BadRequest("Invalid access token or refresh token");
            }

            _ = int.TryParse(_configuration["JWT:RefreshTokenValidityInDays"], out int refreshTokenValidityInDays);
            var access = GenerateAccessToken(user).Result;
            var refrech = GenerateRefreshToken();

            user.RefreshToken = refrech;
            var date = DateTime.Now.AddDays(refreshTokenValidityInDays);
            user.RefreshTokenExpiryTime = new DateOnly(date.Year, date.Month, date.Day);
            await _userManager.UpdateAsync(user);

            return Ok(new RefrechResponse() 
            { 
                AccessToken = access,
                RefrechToken = refrech,
                Time = user.RefreshTokenExpiryTime.ToString("yyyy-MM-dd")
            });
        }

        [HttpGet]
        [Route("logout/{id}")]
        public async Task Logout(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user != null)
            {
                user.RefreshToken = null;
                await _userManager.UpdateAsync(user);
            }
        }

        [HttpPost]
        [Route("passwordChange")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> PasswordChange(UserUp userUp)
        {
            var user = await _userManager.FindByIdAsync(userUp.Id);

            if (user != null)
            {
                var loginResult = await _signInManager.CheckPasswordSignInAsync(user, userUp.Password, false);

                if (loginResult.Succeeded)
                {
                    var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                    await _userManager.ResetPasswordAsync(user, token, userUp.NextPassword);
                    return Ok();
                }
            }
            return BadRequest();
        }

        private ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]!)),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }

            return principal;
        }

        private static string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private async Task<string> GenerateAccessToken(User? user)
        {
            var now = DateTime.Now;
            if (user == null || user.RefreshToken != user.RefreshToken || (user.RefreshTokenExpiryTime != DateOnly.MinValue && user.RefreshTokenExpiryTime <= new DateOnly(now.Year, now.Month, now.Day)))
            {
                return String.Empty;
            }

            _ = int.TryParse(_configuration["JWT:TokenValidityInMinutes"], out int tokenValidityInMinutes);

            IList<string> roles = await _userManager.GetRolesAsync(user);

            List<Claim> claims = new List<Claim>() { new Claim(JwtRegisteredClaimNames.Name, user.UserName), };
            foreach (var item in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, item));
            }

            var claimsIdentity = new ClaimsIdentity(claims);

            var signingCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]!)),
                SecurityAlgorithms.HmacSha256Signature);

            var securityTokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = claimsIdentity,
                Expires = DateTime.Now.AddMinutes(tokenValidityInMinutes),
                SigningCredentials = signingCredentials,
            };

            var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            var securityToken = jwtSecurityTokenHandler.CreateToken(securityTokenDescriptor);
            var jwtToken = jwtSecurityTokenHandler.WriteToken(securityToken);

            return jwtToken;
        }
    }
}
