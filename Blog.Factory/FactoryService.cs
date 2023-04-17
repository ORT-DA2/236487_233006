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
        serviceCollection.AddTransient<IRepository<Role>, BaseRepository<Role>>();
        serviceCollection.AddTransient<IRepository<Article>, ArticleRepository>();
        serviceCollection.AddTransient<IRepository<Comment>, CommentRepository>();
        serviceCollection.AddTransient<IRepository<Session>, SessionRepository>();

        // Inject Services
        serviceCollection.AddTransient<IUserService, UserService>();
        serviceCollection.AddTransient<IRoleService, RoleService>();
        serviceCollection.AddTransient<IArticleService, ArticleService>();
        serviceCollection.AddTransient<ICommentService, CommentService>();

        // scoped ya que este service maneja estado, tiene el currentUser
        serviceCollection.AddScoped<ISessionService, SessionService>();

        serviceCollection.AddDbContext<BlogContext>();
    }
}
