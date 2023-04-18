namespace Identity.Model
{
    public class AuthenticationResponse
    {
        public string? UserId { get; set; }
        public string? UserName { get; set; }
        public string? AccessToken { get; set; }
        public string? RefrechToken { get; set; }
        public string? Time { get; set; }
        public IList<string>? Roles { get; set; }
    }
}
