using System.Linq.Expressions;
using System.Security.Authentication;
using Blog.Domain;
using Blog.Domain.Entities;
using Blog.IDataAccess;
using Moq;

namespace Blog.Services.Test;

[TestClass]
public class SessionServiceTest
{
    private Mock<IRepository<Session>> _sessionRepositoryMock;
    private Mock<IRepository<User>> _userRepositoryMock;
    private SessionService _sessionService;
    private Guid _validAuthToken;
    private User _validUser;

    [TestInitialize]
    public void Setup()
    {
        _sessionRepositoryMock = new Mock<IRepository<Session>>();
        _userRepositoryMock = new Mock<IRepository<User>>();
        _sessionService = new SessionService(_sessionRepositoryMock.Object, _userRepositoryMock.Object);

        _validAuthToken = Guid.NewGuid();
        _validUser = new User { Id = 1, Email = "test@example.com", Username = "testuser", Password = "password123" };
    }

    [TestMethod]
    public void GetCurrentUser_ReturnsCurrentUserWhenAuthTokenIsValid()
    {
        // Arrange
        var validSession = new Session { AuthToken = _validAuthToken, User = _validUser };
        _sessionRepositoryMock.Setup(repo => repo.GetOneBy(It.IsAny<Expression<Func<Session, bool>>>())).Returns(validSession);

        // Act
        var currentUser = _sessionService.GetCurrentUser(_validAuthToken);

        // Assert
        Assert.IsNotNull(currentUser);
        Assert.AreEqual(_validUser, currentUser);
    }

    [TestMethod]
    public void GetCurrentUser_ThrowsArgumentExceptionWhenAuthTokenIsNull()
    {
        // Act and Assert
        Assert.ThrowsException<ArgumentException>(() => _sessionService.GetCurrentUser(null));
    }

    [TestMethod]
    public void GetCurrentUser_ReturnsNullWhenSessionNotFound()
    {
        // Arrange
        _sessionRepositoryMock.Setup(repo => repo.GetOneBy(It.IsAny<Expression<Func<Session, bool>>>())).Returns(default(Session));

        // Act
        var currentUser = _sessionService.GetCurrentUser(_validAuthToken);

        // Assert
        Assert.IsNull(currentUser);
    }



    [TestMethod]
    public void Authenticate_ReturnsValidAuthTokenWhenCredentialsAreValid()
    {
        // Arrange
        _userRepositoryMock.Setup(repo => repo.GetOneBy(It.IsAny<Expression<Func<User, bool>>>())).Returns(_validUser);
        _sessionRepositoryMock.Setup(repo => repo.Insert(It.IsAny<Session>()));
        _sessionRepositoryMock.Setup(repo => repo.Save());

        // Act
        var authToken = _sessionService.Authenticate(_validUser.Email, _validUser.Username, _validUser.Password);

        // Assert
        Assert.IsNotNull(authToken);
        _sessionRepositoryMock.VerifyAll();
    }

    [TestMethod]
    public void Authenticate_ThrowsInvalidCredentialExceptionWhenCredentialsAreInvalid()
    {
        // Arrange
        _userRepositoryMock.Setup(repo => repo.GetOneBy(It.IsAny<Expression<Func<User, bool>>>())).Returns(default(User));

        // Act and Assert
        Assert.ThrowsException<InvalidCredentialException>(() => _sessionService.Authenticate("invalid@example.com", "invaliduser", "invalidpassword"));
    }


    [TestMethod]
    public void Authenticate_ReturnsAuthToken_WhenCredentialsAreValid()
    {
        // Arrange
        var email = "johndoe@example.com";
        var username = "johndoe";
        var password = "password123";
        var expectedAuthToken = Guid.NewGuid();
        var user = new User { Email = email, Username = username, Password = password };
        var session = new Session { AuthToken = expectedAuthToken, User = user };
        _userRepositoryMock.Setup(repo => repo.GetOneBy(It.IsAny<Expression<Func<User, bool>>>())).Returns(user);
        _sessionRepositoryMock.Setup(repo => repo.Insert(It.IsAny<Session>())).Callback<Session>(s => s.AuthToken = expectedAuthToken);
        _sessionRepositoryMock.Setup(repo => repo.Save());

        // Act
        var authToken = _sessionService.Authenticate(email, username, password);

        // Assert
        Assert.AreEqual(expectedAuthToken, authToken);
        _userRepositoryMock.Verify(repo => repo.GetOneBy(It.IsAny<Expression<Func<User, bool>>>()), Times.Once);
        _sessionRepositoryMock.Verify(repo => repo.Insert(It.IsAny<Session>()), Times.Once);
        _sessionRepositoryMock.Verify(repo => repo.Save(), Times.Once);
    }


    [TestMethod]
    public void Logout_DeletesSessionWithProvidedAuthorization()
    {
        // Arrange
        var authToken = Guid.NewGuid();
        var session = new Session { AuthToken = authToken };
        _sessionRepositoryMock.Setup(repo => repo.GetOneBy(It.IsAny<Expression<Func<Session, bool>>>())).Returns(session);

        // Act
        _sessionService.Logout(authToken);

        // Assert
        _sessionRepositoryMock.Verify(repo => repo.Delete(session), Times.Once);
        _sessionRepositoryMock.Verify(repo => repo.Save(), Times.Once);
    }
}
