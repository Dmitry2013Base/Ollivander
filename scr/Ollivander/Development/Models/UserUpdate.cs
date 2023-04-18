namespace Development.Models
{
    public class UserUpdate
    {
        public string? UserId { get; set; }
        public string? RoleName { get; set; }
        public bool AddOrRemove { get; set; }
    }
}
