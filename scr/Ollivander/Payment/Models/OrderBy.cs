using DatabaseModel;

namespace Payment.Models
{
    public class OrderBy
    {
        public User? User { get; set; }
        public string? CardNumber { get; set; }
        public string? CardMonth { get; set; }
        public string? CardYear { get; set; }
        public string? CardCode { get; set; }
        public List<int>? ProductsId { get; set; }
    }
}
