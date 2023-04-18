using Microsoft.AspNetCore.Identity;

namespace DatabaseModel
{
    public class User : IdentityUser
    {
        public string? RefreshToken { get; set; }
        public DateOnly RefreshTokenExpiryTime { get; set; }
        public DateOnly Created { get; set; }
    }
}
