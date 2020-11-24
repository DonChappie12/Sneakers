using Microsoft.EntityFrameworkCore;

namespace shoeBackEnd.Models
{
    public class DataBaseContext : DbContext
    {
        public DbSet<User> user { get; set;}
        public DbSet<Review> review { get; set;}
        public DbSet<Shoe> shoe { get; set;}
        public DbSet<Order> order { get; set;}

        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options) { }
    }
}