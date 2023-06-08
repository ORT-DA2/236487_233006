using Blog.DataAccess;
using Blog.Domain;
using Blog.DataAccess.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Blog.DataAccess.Test;

[TestClass]
public class RoleRepositoryTest
{
    private readonly RoleRepository _repository;
    private readonly BlogContext _blogContext;

    public RoleRepositoryTest()
    {
        _blogContext = ContextFactory.GetNewContext(ContextType.SQLite);
        _repository = new RoleRepository(_blogContext);
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
    public void GetAllRoles_ShouldReturnAllRoles()
    {
        // Arrange
        var roles = new List<Role>
        {
            new Role { RoleType = RoleType.Admin },
            new Role { RoleType = RoleType.Blogger }
        };

        _blogContext.Roles.AddRange(roles);
        _blogContext.SaveChanges();

        // Act
        var savedRoles = _repository.GetAllRoles();

        // Assert
        Assert.AreEqual(roles.Count, savedRoles.Count);
        CollectionAssert.AreEqual(roles, savedRoles);
    }

    [TestMethod]
    public void GetOneBy_ShouldReturnCorrectRole()
    {
        // Arrange
        var adminRole = new Role { RoleType = RoleType.Admin };
        var bloggerRole = new Role { RoleType = RoleType.Blogger };

        _blogContext.Roles.Add(adminRole);
        _blogContext.Roles.Add(bloggerRole);
        _blogContext.SaveChanges();

        // Act
        var foundRole = _repository.GetOneBy(r => r.RoleType == RoleType.Admin);

        // Assert
        Assert.IsNotNull(foundRole);
        Assert.AreEqual(adminRole.Id, foundRole.Id);
    }
}
