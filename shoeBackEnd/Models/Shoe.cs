using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace shoeBackEnd.Models
{
    public class Shoe
    {
        [Key]
        public int id { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public double Price { get; set; }
        public string Sex { get; set; }
        public string Description { get; set; }
        public double Rating { get; set; }
        
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime Created_At { get; set; }
        
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime Updated_At { get; set; }

        [ForeignKey("user")]
        public int user_id { get; set; }
        public User user { get; set; }
        public List<Order> Orders { get; set; }
        public List<Review> Reviews { get; set; }
        public Shoe()
        {
            Orders = new List<Order>();
            Reviews = new List<Review>();
        }
    }
}