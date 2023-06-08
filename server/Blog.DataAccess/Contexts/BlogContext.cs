using Blog.Domain;
using Blog.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Drawing;

namespace Blog.DataAccess.Contexts
{
    public class BlogContext : DbContext
    {
        public DbSet<Article> Articles { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Session> Sessions { get; set; }

        public DbSet<OffensiveWord> OffensiveWords { get; set; }

        public BlogContext(DbContextOptions options) : base(options) { }
        public BlogContext() : base() { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the OnDelete behavior for Comment-Article relationship
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Article)
                .WithMany(a => a.Comments)
                .OnDelete(DeleteBehavior.Restrict);


            // Configure the OnDelete behavior for Comment-Author (User) relationship
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Author)
                .WithMany(u => u.Comments)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure the OnDelete behavior for User-Article relationship
            modelBuilder.Entity<User>()
                .HasMany(u => u.Articles)
                .WithOne(a => a.Author)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure the OnDelete behavior for User-Comment relationship
            modelBuilder.Entity<User>()
                .HasMany(u => u.Comments)
                .WithOne(c => c.Author)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure the OnDelete behavior for User-UserRoles relationship
            modelBuilder.Entity<User>()
                .HasMany(u => u.UserRoles)
                .WithOne(ur => ur.User)
                .OnDelete(DeleteBehavior.Cascade);

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var directory = Directory.GetCurrentDirectory();

                var configuration = new ConfigurationBuilder()
                    .SetBasePath(directory)
                    .AddJsonFile("appsettings.json")
                    .Build();

                var connectionString = configuration.GetConnectionString("BlogDB");
                optionsBuilder.UseSqlServer(connectionString);
            }
        }
    }
}
