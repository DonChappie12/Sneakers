using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace shoeBackEnd.Models
{
    public class User
    {
        public int id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime Created_At { get; set; }
        
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime Updated_At { get; set; }
        public List<Shoe> Shoes { get; set; }
        public List<Review> Reviews { get; set; }
        public List<Order> Orders { get; set; }
        public User()
        {
            Shoes = new List<Shoe>();
            Reviews = new List<Review>();
            Orders = new List<Order>();
        }
    }
}