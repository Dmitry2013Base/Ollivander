using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseModel
{
    public class UserCollections
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public User? User { get; set; }
        public Product? Product { get; set; }

    }
}
