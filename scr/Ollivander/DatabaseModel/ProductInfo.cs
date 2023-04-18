using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseModel
{
    public class ProductInfo
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Value { get; set; }
        public Product? Product { get; set; }
    }
}
