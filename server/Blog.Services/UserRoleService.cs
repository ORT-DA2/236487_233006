using Blog.Domain;
using Blog.IDataAccess;
using Blog.IServices;

namespace Blog.Services;

public class UserRoleService : IUserRoleService
{
    private readonly IRepository<UserRole> _repository;

    public UserRoleService(IRepository<UserRole> repository)
    {
        _repository = repository;
    }

    public UserRole CreateUserRole(UserRole newUserRole)
    {
        _repository.Insert(newUserRole);
        _repository.Save();
        return newUserRole;
    }
}
