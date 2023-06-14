using Blog.Domain;

namespace Blog.IServices;

public interface IUserRoleService
{
    UserRole CreateUserRole(UserRole userRole);
}
