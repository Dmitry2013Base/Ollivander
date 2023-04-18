using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseModel
{
    public class Comment
    {
        public int Id { get; set; }
        public DateOnly Created { get; set; }
        public User? User { get; set; }
        public Product? Product { get; set; }
        public string? Plus { get; set; }
        public string? Minus { get; set; }
        public string? Message { get; set; }
        public double Rate { get; set; }
    }
}
