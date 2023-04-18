using DatabaseModel;

namespace Catalog.Models
{
    public class ProductUp
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
        public string? CategoryName { get; set; }
        public decimal Price { get; set; }
        public decimal Sale { get; set; }
        public int Count { get; set; }
        public List<ProductInfo>? Infos { get; set; }
    }
}
