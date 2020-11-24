using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace shoeBackEnd.Models
{
    public class Order
    {
        [Key]
        public int id { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime Created_At { get; set; }
        
        [ForeignKey("user")]
        public int user_id { get; set; }
        public User user { get; set; }

        [ForeignKey("shoe")]
        public int shoe_id { get; set; }
        public Shoe shoe { get; set; }
    }
}