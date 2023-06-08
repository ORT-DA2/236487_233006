using System.Linq.Expressions;
using Blog.DataAccess;
using Blog.DataAccess.Contexts;
using Blog.Domain;
using Blog.IDataAccess;


namespace Blog.DataAccess;

public class RoleRepository : IRoleRepository
{
    protected readonly BlogContext _context;

    public RoleRepository(BlogContext context)
    {
        _context = context;
    }


    public List<Role> GetAllRoles()
    {
       return _context.Roles.ToList();
    }

    public virtual Role GetOneBy(Expression<Func<Role, bool>> expression)
    {
        return _context.Set<Role>().FirstOrDefault(expression);
    }
}
