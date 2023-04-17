﻿using Microsoft.Extensions.DependencyInjection;
using Blog.DataAccess;
using Blog.DataAccess.Contexts;
using Blog.Domain;
using Blog.IServices;
using Blog.IDataAccess;
using Blog.Services;


namespace Blog.Factory;

public class FactoryService
{

    public void RegisterServices(IServiceCollection serviceCollection)
    {
        // Inject Repositories
        serviceCollection.AddTransient<IRepository<User>, UserRepository>();
        serviceCollection.AddTransient<IRoleRepository, RoleRepository>();
        serviceCollection.AddTransient<IRepository<Article>, ArticleRepository>();
        serviceCollection.AddTransient<IRepository<Comment>, CommentRepository>();
        serviceCollection.AddTransient<IRepository<UserRole>, BaseRepository<UserRole>>();

        // Inject Services
        serviceCollection.AddTransient<IUserService, UserService>();
        serviceCollection.AddTransient<IRoleService, RoleService>();
        serviceCollection.AddTransient<IArticleService, ArticleService>();
        serviceCollection.AddTransient<ICommentService, CommentService>();
        serviceCollection.AddTransient<IUserRoleService, UserRoleService>();


        // Lo hago scoped ya que este manager maneja estado, tiene el currentUser
        // serviceCollection.AddScoped<ISessionManager, SessionManager>();

        serviceCollection.AddDbContext<BlogContext>();
    }
}
