using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Blog.DataAccess.Contexts;

// Para testing usar SQLite, por defecto usar SQLServer
public enum ContextType { SQLite, SQLServer }

public class ContextFactory : IDesignTimeDbContextFactory<BlogContext>
{
    public BlogContext CreateDbContext(string[] args)
    {
        return GetNewContext();
    }

    public static BlogContext GetNewContext(ContextType type = ContextType.SQLServer)
    {
        var builder = new DbContextOptionsBuilder<BlogContext>();
        DbContextOptions options = null;

        if (type == ContextType.SQLite)
        {
            options = GetSqliteConfig(builder);
        }
        else
        {
            options = GetSqlServerConfig(builder);
        }

        return new BlogContext(options);
    }

    private static DbContextOptions GetSqliteConfig(DbContextOptionsBuilder builder)
    {
        var connection = new SqliteConnection("Filename=:memory:");
        builder.UseSqlite(connection);
        return builder.Options;
    }

    private static DbContextOptions GetSqlServerConfig(DbContextOptionsBuilder builder)
    {
        //Gets directory from startup project being used, NOT this class's path 
        var directory = Directory.GetCurrentDirectory();

        var configuration = new ConfigurationBuilder()
            .SetBasePath(directory)
            .AddJsonFile("appsettings.json")
            .Build();

        var connectionString = configuration.GetConnectionString("BlogDB");
        builder.UseSqlServer(connectionString);
        return builder.Options;
    }
}
