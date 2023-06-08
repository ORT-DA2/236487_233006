using Blog.Domain;
using Blog.IDataAccess;
using Moq;

namespace Blog.Services.Test;

[TestClass]
public class UserRoleServiceTest
{
    private UserRoleService _userRoleService;
    private Mock<IRepository<UserRole>> _repoMock;

    [TestInitialize]
    public void Setup()
    {
        _repoMock = new Mock<IRepository<UserRole>>();
        _userRoleService = new UserRoleService(_repoMock.Object);
    }

    [TestMethod]
    public void CreateUserRole_ShouldInsertAndSave()
    {
        // Arrange
        var newUserRole = new UserRole { Id = 1, Role = new Role()};
        _repoMock.Setup(repo => repo.Insert(newUserRole)).Verifiable();
        _repoMock.Setup(repo => repo.Save()).Verifiable();

        // Act
        var result = _userRoleService.CreateUserRole(newUserRole);

        // Assert
        Assert.IsNotNull(result);
        _repoMock.Verify(repo => repo.Insert(newUserRole), Times.Once);
        _repoMock.Verify(repo => repo.Save(), Times.Once);
    }
}
