using Blog.Domain.Exceptions;

namespace Blog.Domain;

public class Role
{
    public int Id { get; set; }
    public RoleType RoleType { get; set; }

    public List<UserRole> UserRole {get;set;}

    public Role()
    {
        RoleType = RoleType.Blogger;
    }

    public void UpdateAttributes(Role role)
    {
        RoleType = role.RoleType;
        UserRole = role.UserRole;
    }

}

public enum RoleType
{
    Admin = 1,
    Blogger = 2
}
