using Blog.Domain;
using Blog.DataAccess.Contexts;
using Blog.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Blog.DataAccess.Test;

[TestClass]
public class SessionRepositoryTests
{
    private readonly SessionRepository _repository;
    private readonly BlogContext _blogContext;

    public SessionRepositoryTests()
    {
        _blogContext = ContextFactory.GetNewContext(ContextType.SQLite);
        _repository = new SessionRepository(_blogContext);
    }

    [TestInitialize]
    public void SetUp()
    {
        _blogContext.Database.OpenConnection();
        _blogContext.Database.EnsureCreated();
    }

    [TestCleanup]
    public void CleanUp()
    {
        _blogContext.Database.EnsureDeleted();
    }

    [TestMethod]
    public void GetOneBy_ShouldReturnCorrectSession()
    {
        // Arrange
        var user = new User
            { FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", Password = "password456" };
        _blogContext.Users.Add(user);
        _blogContext.SaveChanges();

        var session = new Session { User = user };
        _blogContext.Sessions.Add(session);
        _blogContext.SaveChanges();

        // Act
        var foundSession = _repository.GetOneBy(s => s.AuthToken == session.AuthToken);

        // Assert
        Assert.IsNotNull(foundSession);
        Assert.AreEqual(session, foundSession);
    }

    [TestMethod]
    public void Insert_ShouldAddNewSession()
    {
        // Arrange
        var user = new User
            { FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", Password = "password456" };
        _blogContext.Users.Add(user);
        _blogContext.SaveChanges();

        var session = new Session { User = user };

        // Act
        _repository.Insert(session);
        _blogContext.SaveChanges();

        // Assert
        Assert.AreEqual(1, _blogContext.Sessions.Count());
        Assert.IsNotNull(_blogContext.Sessions.FirstOrDefault(s => s.Id == session.Id));
    }

}
