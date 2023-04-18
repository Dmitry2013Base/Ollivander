namespace Identity.Model
{
    public class RegistrationRequest
    {
        public string? Login { get; set; }
        public string? Password { get; set; }
        public string? PasswordRepeat { get; set; }
    }
}
