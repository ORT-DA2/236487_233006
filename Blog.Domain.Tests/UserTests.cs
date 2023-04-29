using Blog.Domain.Exceptions;

namespace Blog.Domain.Tests;

using System.ComponentModel.DataAnnotations;
using Blog.Domain;

[TestClass]
public class UserTests
{
    private User _user;

    [TestInitialize]
    public void Initialize()
    {
        _user = new User
        {
            Id = 1,
            FirstName = "FirstName",
            LastName = "LastName",
            Username = "username",
            Email = "email@example.com",
            Password = "password123"
        };
    }

    [TestMethod]
    public void ValidOrFailPassesWithValidUser()
    {
        _user.ValidOrFail();
    }

    [TestMethod]
    [ExpectedException(typeof(InvalidResourceException))]
    public void ValidOrFailThrowsExceptionWithInvalidUsername()
    {
        _user.Username = "";
        _user.ValidOrFail();
    }

    [TestMethod]
    [ExpectedException(typeof(InvalidResourceException))]
    public void ValidOrFailThrowsExceptionWithInvalidPassword()
    {
        _user.Password = "short";
        _user.ValidOrFail();
    }

    [TestMethod]
    [ExpectedException(typeof(InvalidResourceException))]
    public void ValidOrFailThrowsExceptionWithInvalidEmail()
    {
        _user.Email = "invalidemail";
        _user.ValidOrFail();
    }

    [TestMethod]
    [ExpectedException(typeof(InvalidResourceException))]
    public void ValidOrFailThrowsExceptionWithInvalidFirstName()
    {
        _user.FirstName = "";
        _user.ValidOrFail();
    }

    [TestMethod]
    [ExpectedException(typeof(InvalidResourceException))]
    public void ValidOrFailThrowsExceptionWithInvalidLastName()
    {
        _user.LastName = "";
        _user.ValidOrFail();
    }

    [TestMethod]
    public void UpdateAttributesUpdatesUserAttributesCorrectly()
    {
        var user2 = new User
        {
            FirstName = "NewFirstName",
            LastName = "NewLastName",
            Username = "newusername",
            Email = "newemail@example.com",
            Password = "newpassword123",
            UpdatedAt = DateTimeOffset.Now
        };

        _user.UpdateAttributes(user2);

        Assert.AreEqual(_user.FirstName, user2.FirstName);
        Assert.AreEqual(_user.LastName, user2.LastName);
        Assert.AreEqual(_user.Username, user2.Username);
        Assert.AreEqual(_user.Email, user2.Email);
        Assert.AreEqual(_user.Password, user2.Password);
        Assert.AreEqual(_user.UpdatedAt, user2.UpdatedAt);
    }

    [TestMethod]
    public void EqualsCorrectlyComparesUsersIds()
    {
        var user2 = new User { Id = 1 };
        var user3 = new User { Id = 2 };

        Assert.IsTrue(_user.Equals(user2));
        Assert.IsFalse(_user.Equals(user3));
        Assert.IsFalse(_user.Equals(null));
    }

    [TestMethod]
    public void IsValidEmailWorksCorrectlyWithValidAndInvalidEmails()
    {
        var testCases = new[]
        {
            new { Email = "email@example.com", ExpectedResult = true },
            new { Email = "email@subdomain.example.com", ExpectedResult = true },
            new { Email = "email@example", ExpectedResult = false },
            new { Email = "email@", ExpectedResult = false },
            new { Email = "@example.com", ExpectedResult = false },
            new { Email = "email@.com", ExpectedResult = false },
        };

        foreach (var testCase in testCases)
        {
            bool result = _user.IsValidEmail(testCase.Email);
            Assert.AreEqual(testCase.ExpectedResult, result);
        }
    }

    [TestMethod]
[ExpectedException(typeof(InvalidResourceException))]
public void ValidateUsernameThrowsExceptionWithEmptyUsername()
{
    _user.Username = "";
    _user.ValidateUsername();
}

[TestMethod]
[ExpectedException(typeof(InvalidResourceException))]
public void ValidateUsernameThrowsExceptionWithLongUsername()
{
    _user.Username = new string('a', 101);
    _user.ValidateUsername();
}

[TestMethod]
[ExpectedException(typeof(InvalidResourceException))]
public void ValidateUsernameThrowsExceptionWithNonAlphanumericUsername()
{
    _user.Username = "user@name";
    _user.ValidateUsername();
}

[TestMethod]
[ExpectedException(typeof(InvalidResourceException))]
public void ValidatePasswordThrowsExceptionWithEmptyPassword()
{
    _user.Password = "";
    _user.ValidatePassword();
}

[TestMethod]
[ExpectedException(typeof(InvalidResourceException))]
public void ValidatePasswordThrowsExceptionWithShortPassword()
{
    _user.Password = "short";
    _user.ValidatePassword();
}

[TestMethod]
[ExpectedException(typeof(InvalidResourceException))]
public void ValidatePasswordThrowsExceptionWithLongPassword()
{
    _user.Password = new string('a', 101);
    _user.ValidatePassword();
}

[TestMethod]
[ExpectedException(typeof(InvalidResourceException))]
public void ValidatePasswordThrowsExceptionWithSpacesInPassword()
{
    _user.Password = "password with spaces";
    _user.ValidatePassword();
}

[TestMethod]
[ExpectedException(typeof(InvalidResourceException))]
public void ValidateEmailThrowsExceptionWithEmptyEmail()
{
    _user.Email = "";
    _user.ValidateEmail();
}

[TestMethod]
[ExpectedException(typeof(InvalidResourceException))]
public void ValidateEmailThrowsExceptionWithLongEmail()
{
    _user.Email = new string('a', 101) + "@example.com";
    _user.ValidateEmail();
}

[TestMethod]
[ExpectedException(typeof(InvalidResourceException))]
public void ValidateFirstNameThrowsExceptionWithEmptyFirstName()
{
    _user.FirstName = "";
    _user.ValidateFirstName();
}

[TestMethod]
[ExpectedException(typeof(InvalidResourceException))]
public void ValidateFirstNameThrowsExceptionWithLongFirstName()
{
    _user.FirstName = new string('a', 51);
    _user.ValidateFirstName();
}

[TestMethod]
[ExpectedException(typeof(InvalidResourceException))]
public void ValidateLastNameThrowsExceptionWithEmptyLastName()
{
    _user.LastName = "";
    _user.ValidateLastName();
}

[TestMethod]
[ExpectedException(typeof(InvalidResourceException))]
public void ValidateLastNameThrowsExceptionWithLongLastName()
{
    _user.LastName = new string('a', 51);
    _user.ValidateLastName();
}

[TestMethod]
public void UserConstructorInitializesCollections()
{
    var newUser = new User();
    Assert.IsNotNull(newUser.Articles);
    Assert.IsNotNull(newUser.Comments);
    Assert.IsNotNull(newUser.UserRole);
}




}
