using Blog.DataAccess.Contexts;
using Blog.Domain;
using Microsoft.EntityFrameworkCore;

namespace Blog.DataAccess.Test;

[TestClass]
public class UserRepositoryTest
{
    private readonly UserRepository _repository;
    private readonly BlogContext _blogContext;

    public UserRepositoryTest()
    {
        _blogContext = ContextFactory.GetNewContext(ContextType.SQLite);
        _repository = new UserRepository(_blogContext);
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
public void GetAllUsersFilteredByUsername()
{
    // Arrange
    var usersInDatabase = new List<User>{
        new()
        {
            FirstName = "John",
            LastName = "Doe",
            Username = "johndoe",
            Email = "john@example.com",
            Password = "password123"
        },
        new()
        {
            FirstName = "Jane",
            LastName = "Doe",
            Username = "janedoe",
            Email = "jane@example.com",
            Password = "password456"
        }
    };

    _blogContext.AddRange(usersInDatabase);
    _blogContext.SaveChanges();
    var usersExpected = usersInDatabase.Where(u => u.Username.ToLower().Contains("johndoe")).ToList();

    // Act
    var usersSaved = _repository.GetAllBy(user => user.Username.ToLower().Contains("johndoe")).ToList();

    // Assert
    Assert.AreEqual(usersExpected.Count(), usersSaved.Count());
}

[TestMethod]
public void InsertNewUser()
{
    // Arrange
    var newUser = new User()
    {
        FirstName = "Alice",
        LastName = "Smith",
        Username = "alicesmith",
        Email = "alice@example.com",
        Password = "password789"
    };

    // Act
    _repository.Insert(newUser);
    _repository.Save();

    // Assert
    var userSaved = _blogContext.Users.FirstOrDefault(u => u.Username == newUser.Username);

    Assert.IsNotNull(userSaved);
    Assert.AreEqual("Alice", userSaved.FirstName);
    Assert.AreEqual("Smith", userSaved.LastName);
    Assert.AreEqual("alicesmith", userSaved.Username);
    Assert.AreEqual("alice@example.com", userSaved.Email);
    Assert.AreEqual("password789", userSaved.Password);
}

[TestMethod]
public void UpdateUserAttributes()
{
    // Arrange
    var initialUser = new User
    {
        FirstName = "John",
        LastName = "Doe",
        Username = "johndoe",
        Email = "john@example.com",
        Password = "password123"
    };

    _blogContext.Users.Add(initialUser);
    _blogContext.SaveChanges();

    var updatedUser = new User
    {
        Id = initialUser.Id,
        FirstName = "Johnny",
        LastName = "Smith",
        Username = "johnnysmith",
        Email = "johnny@example.com",
        Password = "password789"
    };

    // Detach the initial entity from the DbContext
    _blogContext.Entry(initialUser).State = EntityState.Detached;

    // Act
    _repository.Update(updatedUser);
    _repository.Save();

    // Assert
    var savedUser = _repository.GetOneBy(u => u.Id == initialUser.Id);
    Assert.IsNotNull(savedUser);
    Assert.AreEqual(updatedUser.FirstName, savedUser.FirstName);
    Assert.AreEqual(updatedUser.LastName, savedUser.LastName);
    Assert.AreEqual(updatedUser.Username, savedUser.Username);
    Assert.AreEqual(updatedUser.Email, savedUser.Email);
    Assert.AreEqual(updatedUser.Password, savedUser.Password);
}


[TestMethod]
public void DeleteUser()
{
    // Arrange
    var userToDelete = new User()
    {
        FirstName = "John",
        LastName = "Doe",
        Username = "johndoe",
        Email = "john@example.com",
        Password = "password123"
    };

    _blogContext.Users.Add(userToDelete);
    _blogContext.SaveChanges();

    // Act
    _repository.Delete(userToDelete);
    _repository.Save();

    // Assert
    var userDeleted = _blogContext.Users.FirstOrDefault(u => u.Username == "johndoe");
    Assert.IsNull(userDeleted);
}

[TestMethod]
public void GetUsersByRole()
{
    // Arrange
    var adminRole = new Role
    {
        RoleType = RoleType.Admin
    };

    var bloggerRole = new Role
    {
        RoleType = RoleType.Blogger
    };

    _blogContext.Roles.AddRange(new[] { adminRole, bloggerRole });
    _blogContext.SaveChanges();

    var adminUserRole = new UserRole { Role = adminRole };
    var bloggerUserRole = new UserRole { Role = bloggerRole };

    var usersInDatabase = new List<User>
    {
        new()
        {
            FirstName = "John",
            LastName = "Doe",
            Username = "johndoe",
            Email = "john@example.com",
            Password = "password123",
            UserRoles = new List<UserRole> { adminUserRole }
        },
        new()
        {
            FirstName = "Jane",
            LastName = "Doe",
            Username = "janedoe",
            Email = "jane@example.com",
            Password = "password456",
            UserRoles = new List<UserRole> { bloggerUserRole }
        }
    };

    _blogContext.Users.AddRange(usersInDatabase);
    _blogContext.SaveChanges();

// Act
    var adminUsers = _repository.GetAllBy(user => user.UserRoles.Any(ur => ur.Role.RoleType == RoleType.Admin)).ToList();
    var bloggerUsers = _repository.GetAllBy(user => user.UserRoles.Any(ur => ur.Role.RoleType == RoleType.Blogger)).ToList();

// Assert
    Assert.AreEqual(1, adminUsers.Count);
    Assert.AreEqual("johndoe", adminUsers[0].Username);
    Assert.AreEqual(1, bloggerUsers.Count);
    Assert.AreEqual("janedoe", bloggerUsers[0].Username);
}


}
