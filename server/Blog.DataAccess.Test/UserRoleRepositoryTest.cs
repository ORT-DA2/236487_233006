using Blog.DataAccess.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Blog.DataAccess.Test;

using Blog.DataAccess;
using Blog.Domain;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;
using System.Collections.Generic;

[TestClass]
public class UserRoleRepositoryTest
{
    private readonly UserRoleRepository _repository;
    private readonly BlogContext _blogContext;

    public UserRoleRepositoryTest()
    {
        _blogContext = ContextFactory.GetNewContext(ContextType.SQLite);
        _repository = new UserRoleRepository(_blogContext);
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
    public void GetAllBy_ShouldReturnCorrectUserRoles()
    {
        // Arrange
        var user = new User { FirstName = "John", LastName = "Doe" , Email = "john.doe@example.com" , Password = "ac1234567"};
        var adminRole = new Role { RoleType = RoleType.Admin };
        var bloggerRole = new Role { RoleType = RoleType.Blogger };

        _blogContext.Users.Add(user);
        _blogContext.Roles.AddRange(adminRole, bloggerRole);
        _blogContext.SaveChanges();

        var userRoles = new List<UserRole>
        {
            new UserRole { User = user, Role = adminRole },
            new UserRole { User = user, Role = bloggerRole }
        };

        _blogContext.UserRoles.AddRange(userRoles);
        _blogContext.SaveChanges();

        // Act
        var savedUserRoles = _repository.GetAllBy(ur => ur.User.Id == user.Id).ToList();

        // Assert
        Assert.AreEqual(userRoles.Count, savedUserRoles.Count);
    }

    [TestMethod]
    public void GetOneBy_ShouldReturnCorrectUserRole()
    {
        // Arrange
        var user = new User { FirstName = "John", LastName = "Doe",  Email = "john.doe@example.com" , Password = "ac1234567" };
        var adminRole = new Role { RoleType = RoleType.Admin };

        _blogContext.Users.Add(user);
        _blogContext.Roles.Add(adminRole);
        _blogContext.SaveChanges();

        var userRole = new UserRole { User = user, Role = adminRole };
        _blogContext.UserRoles.Add(userRole);
        _blogContext.SaveChanges();

        // Act
        var foundUserRole = _repository.GetOneBy(ur => ur.User.Id == user.Id && ur.Role.Id == adminRole.Id);

        // Assert
        Assert.IsNotNull(foundUserRole);
        Assert.AreEqual(userRole.Id, foundUserRole.Id);
    }

    [TestMethod]
    public void InsertAndSave_NewUserRole_ShouldBeSaved()
    {
        // Arrange
        var user = new User { FirstName = "John", LastName = "Doe" , Email = "john.doe@example.com" , Password = "ac1234567" };
        var adminRole = new Role { RoleType = RoleType.Admin };

        _blogContext.Users.Add(user);
        _blogContext.Roles.Add(adminRole);
        _blogContext.SaveChanges();

        var newUserRole = new UserRole { User = user, Role = adminRole };

        // Act
        _repository.Insert(newUserRole);
        _repository.Save();

        var savedUserRole =
            _blogContext.UserRoles.FirstOrDefault(ur => ur.User.Id == user.Id && ur.Role.Id == adminRole.Id);

        // Assert
        Assert.IsNotNull(savedUserRole);
        Assert.AreEqual(newUserRole.User.Id, savedUserRole.User.Id);
        Assert.AreEqual(newUserRole.Role.Id, savedUserRole.Role.Id);
    }

    [TestMethod]
    public void UpdateAndSave_ExistingUserRole_ShouldBeUpdated()
    {
        // Arrange
        var user = new User { FirstName = "John", LastName = "Doe" , Email = "john.doe@example.com" , Password = "ac1234567" };
        var adminRole = new Role { RoleType = RoleType.Admin };
        var bloggerRole = new Role { RoleType = RoleType.Blogger };

        _blogContext.Users.Add(user);
        _blogContext.Roles.AddRange(adminRole, bloggerRole);
        _blogContext.SaveChanges();

        var userRole = new UserRole { User = user, Role = adminRole };
        _blogContext.UserRoles.Add(userRole);
        _blogContext.SaveChanges();

        // Act
        userRole.Role = bloggerRole;
        _repository.Update(userRole);
        _repository.Save();

        var updatedUserRole = _blogContext.UserRoles.FirstOrDefault(ur => ur.Id == userRole.Id);

        // Assert
        Assert.IsNotNull(updatedUserRole);
        Assert.AreEqual(userRole.Role.Id, updatedUserRole.Role.Id);
    }
}
