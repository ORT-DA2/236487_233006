using Blog.Domain;


[TestClass]
public class RoleTests
{
    private Role _role;

    [TestInitialize]
    public void Initialize()
    {
        _role = new Role
        {
            Id = 1,
            RoleType = RoleType.Blogger
        };
    }

    [TestMethod]
    public void RoleConstructorSetsDefaultRoleType()
    {
        var role = new Role();
        Assert.AreEqual(RoleType.Blogger, role.RoleType);
    }

    [TestMethod]
    public void RoleConstructorInitializesUserRoleCollection()
    {
        var role = new Role();
        Assert.IsNotNull(role.UserRole);
    }

    [TestMethod]
    public void UpdateAttributesUpdatesRoleType()
    {
        var newRole = new Role { RoleType = RoleType.Admin };
        _role.UpdateAttributes(newRole);
        Assert.AreEqual(RoleType.Admin, _role.RoleType);
    }

    [TestMethod]
    public void UpdateAttributesUpdatesUserRoleCollection()
    {
        var newUserRole = new UserRole { Role = new Role { Id = 2 }, User = new User { Id = 1 } };
        var newUserRoleList = new List<UserRole> { newUserRole };
        var newRole = new Role { UserRole = newUserRoleList };
        _role.UpdateAttributes(newRole);
        Assert.IsNotNull(_role.UserRole);
        Assert.AreEqual(1, _role.UserRole.Count);
        Assert.AreEqual(2, _role.UserRole[0].Role.Id);
        Assert.AreEqual(1, _role.UserRole[0].User.Id);
    }
}
