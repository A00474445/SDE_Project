using Eventique_Final.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Eventique_Final.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<User_Event> UserEvents { get; set; }
        public DbSet<Payment> Payments { get; set; }

    }
}
