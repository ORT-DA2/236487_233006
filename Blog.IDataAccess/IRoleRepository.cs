using System.Linq.Expressions;
using Blog.Domain;

namespace Blog.IDataAccess;

public interface IRoleRepository
{
    List<Role> GetAllRoles();

    Role? GetOneBy(Expression<Func<Role, bool>> expression);
}
