using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseModel
{
    public class Product
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
        public Category? Category { get; set; }
        public decimal Price { get; set; }
        public decimal Sale { get; set; }
        public int Count { get; set; }
        public double Rate { get; set; } = 0;
    }
}
