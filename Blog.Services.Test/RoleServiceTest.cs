using System.Linq.Expressions;
using Blog.Domain;
using Blog.Domain.Exceptions;
using Blog.IDataAccess;
using Blog.IServices;
using Moq;

namespace Blog.Services.Test;

[TestClass]
public class RoleServiceTest
{
    private Mock<IRoleRepository> _repoMock;
    private RoleService _roleService;

    [TestInitialize]
    public void Setup()
    {
        _repoMock = new Mock<IRoleRepository>();
        _roleService = new RoleService(_repoMock.Object);
    }

    [TestMethod]
    public void GetSpecificRole_ReturnsRole()
    {
        // Arrange
        var role = new Role { Id = 1, RoleType = RoleType.Admin };
        _repoMock.Setup(repo => repo.GetOneBy(It.IsAny<Expression<Func<Role, bool>>>())).Returns(role);

        // Act
        var result = _roleService.GetSpecificRole((int)role.RoleType);

        // Assert
        Assert.AreEqual(role.Id, result.Id);
    }

    [TestMethod]
    [ExpectedException(typeof(ResourceNotFoundException))]
    public void GetSpecificRole_NotFound_ThrowsResourceNotFoundException()
    {
        // Arrange
        var nonExistentRoleValue = 99;
        _repoMock.Setup(repo => repo.GetOneBy(It.IsAny<Expression<Func<Role, bool>>>())).Returns((Role)null);

        // Act
        _roleService.GetSpecificRole(nonExistentRoleValue);
    }

    [TestMethod]
    public void GetAllRoles_ReturnsListOfRoles()
    {
        // Arrange
        var roles = new List<Role>
        {
            new Role { Id = 1, RoleType = RoleType.Admin },
            new Role { Id = 2, RoleType = RoleType.Blogger },
        };
        _repoMock.Setup(repo => repo.GetAllRoles()).Returns(roles);

        // Act
        var result = _roleService.GetAllRoles();

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(roles.Count, result.Count);
        CollectionAssert.AreEqual(roles, result);
        _repoMock.Verify(repo => repo.GetAllRoles(), Times.Once);
    }

    [TestCleanup]
    public void Cleanup()
    {
        _repoMock.VerifyAll();
    }
}
