using Microsoft.Extensions.DependencyInjection;
using Blog.DataAccess;
using Blog.DataAccess.Contexts;
using Blog.Domain;
using Blog.IServices;
using Blog.IDataAccess;
using Blog.Services;
using Blog.Domain.Entities;

namespace Blog.Factory;

public class FactoryService
{

    public void RegisterServices(IServiceCollection serviceCollection)
    {
        // Inject Repositories
        serviceCollection.AddTransient<IRepository<User>, UserRepository>();
        serviceCollection.AddTransient<IRoleRepository, RoleRepository>();
        serviceCollection.AddTransient<IRepository<Article>, ArticleRepository>();
        serviceCollection.AddTransient<ICommentRepository, CommentRepository>();
        serviceCollection.AddTransient<IRepository<Session>, SessionRepository>();
        serviceCollection.AddTransient<IRepository<UserRole>, BaseRepository<UserRole>>();
        serviceCollection.AddTransient<IRepository<OffensiveWord>, BaseRepository<OffensiveWord>>();

        // Inject Services
        serviceCollection.AddTransient<IUserService, UserService>();
        serviceCollection.AddTransient<IRoleService, RoleService>();
        serviceCollection.AddTransient<IArticleService, ArticleService>();
        serviceCollection.AddTransient<ICommentService, CommentService>();
        serviceCollection.AddTransient<IUserRoleService, UserRoleService>();
        serviceCollection.AddTransient<IOffensiveWordService, OffensiveWordService>();

        // scoped ya que este service maneja estado, tiene el currentUser
        serviceCollection.AddScoped<ISessionService, SessionService>();

        serviceCollection.AddDbContext<BlogContext>();
    }
}
