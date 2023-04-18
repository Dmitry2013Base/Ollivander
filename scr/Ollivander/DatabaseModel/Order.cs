using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseModel
{
    public class Order
    {
        public int Id { get; set; }
        public User? User { get; set; }
        public Product? Product { get; set; }
        public decimal Price { get; set; }
        public Status? Status { get; set; }
        public DateOnly Created { get; set; }
        public DateOnly DateChange { get; set; }
        public User? UserChange { get; set; }
        public string? Comment { get; set; }
    }
}
