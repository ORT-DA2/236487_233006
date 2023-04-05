using System.ComponentModel.DataAnnotations;
using Blog.Domain;

[TestClass]
public class UserTests
{
    [TestMethod]
    public void CreateUser_Sets_CreatedAt()
    {
        // Arrange
        var user = new User();

        // Act
        var createdAt = user.CreatedAt;

        // Assert
        Assert.IsNotNull(createdAt);
        Assert.IsTrue(createdAt.Value <= DateTimeOffset.UtcNow);
    }

    [TestMethod]
    public void CreateUser_WithInvalidFirstName_GeneratesValidationError()
    {
        // Arrange
        var user = new User
        {
            FirstName = new string('a', 51),
            LastName = "LastName",
            Username = "username",
            Email = "email@example.com",
            Password = "password1234"
        };

        // Act
        var context = new ValidationContext(user);
        var result = Validator.TryValidateObject(user, context, null, true);

        // Assert
        Assert.IsFalse(result);
    }

    [TestMethod]
    public void CreateUser_WithInvalidLastName_GeneratesValidationError()
    {
        // Arrange
        var user = new User
        {
            FirstName = "FirstName",
            LastName = new string('b', 51),
            Username = "username",
            Email = "email@example.com",
            Password = "password1234"
        };

        // Act
        var context = new ValidationContext(user);
        var result = Validator.TryValidateObject(user, context, null, true);

        // Assert
        Assert.IsFalse(result);
    }

    [TestMethod]
    public void CreateUser_WithInvalidUsername_GeneratesValidationError()
    {
        // Arrange
        var user = new User
        {
            FirstName = "FirstName",
            LastName = "LastName",
            Username = new string('c', 51),
            Email = "email@example.com",
            Password = "password1234"
        };

        // Act
        var context = new ValidationContext(user);
        var result = Validator.TryValidateObject(user, context, null, true);

        // Assert
        Assert.IsFalse(result);
    }

    [TestMethod]
    public void CreateUser_WithInvalidEmail_GeneratesValidationError()
    {
        // Arrange
        var user = new User
        {
            FirstName = "FirstName",
            LastName = "LastName",
            Username = "username",
            Email = "invalid-email",
            Password = "password1234"
        };

        // Act
        var context = new ValidationContext(user);
        var result = Validator.TryValidateObject(user, context, null, true);

        // Assert
        Assert.IsFalse(result);
    }

    [TestMethod]
    public void CreateUser_WithInvalidPassword_GeneratesValidationError()
    {
        // Arrange
        var user = new User
        {
            FirstName = "FirstName",
            LastName = "LastName",
            Username = "username",
            Email = "email@example.com",
            Password = "short"
        };

        // Act
        /*  ValidationContext constructor takes an object as a parameter, which is the object you want to validate */
        var context = new ValidationContext(user);
        var result = Validator.TryValidateObject(user, context, null, true);

        // Assert
        Assert.IsFalse(result);
    }
}
