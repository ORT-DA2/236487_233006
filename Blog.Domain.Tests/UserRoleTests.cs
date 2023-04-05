using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using Blog.Domain;

[TestClass]
public class UserRoleTests
{
    [TestMethod]
    public void CreateUserRole_DefaultUserId_IsZero()
    {
        // Arrange
        var userRole = new UserRole();

        // Act
        var userId = userRole.UserId;

        // Assert
        Assert.AreEqual(0, userId);
    }



    [TestMethod]
    public void CreateUserRole_DefaultUser_IsNull()
    {
        // Arrange
        var userRole = new UserRole();

        // Act
        var user = userRole.User;

        // Assert
        Assert.IsNull(user);
    }

    [TestMethod]
    public void CreateUserRole_SetUserId_UserIdIsSet()
    {
        // Arrange
        var userRole = new UserRole { UserId = 1 };

        // Act
        var userId = userRole.UserId;

        // Assert
        Assert.AreEqual(1, userId);
    }

    [TestMethod]
    public void CreateUserRole_SetRole_RoleIsSet()
    {
        // Arrange
        var userRole = new UserRole { Role = RoleType.Admin };

        // Act
        var role = userRole.Role;

        // Assert
        Assert.AreEqual(RoleType.Admin, role);
    }

    [TestMethod]
    public void CreateUserRole_SetUser_UserIsSet()
    {
        // Arrange
        var user = new User
        {
            FirstName = "FirstName",
            LastName = "LastName",
            Username = "username",
            Email = "email@example.com",
            Password = "password1234"
        };

        var userRole = new UserRole { User = user };

        // Act
        var assignedUser = userRole.User;

        // Assert
        Assert.IsNotNull(assignedUser);
        Assert.AreEqual(user, assignedUser);
    }
}
