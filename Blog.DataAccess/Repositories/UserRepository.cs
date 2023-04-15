using System.Linq.Expressions;
using Blog.DataAccess;
using Microsoft.EntityFrameworkCore;
using Blog.DataAccess.Contexts;
using Blog.Domain;

namespace Blog.DataAccess;

public class UserRepository : BaseRepository<User>
{

    public UserRepository(BlogContext context) : base(context){}


    public override IEnumerable<User> GetAllBy(Expression<Func<User, bool>> expression)
    {
        return _context.Set<User>().Where(expression)
            .Include(u => u.UserRole).ThenInclude(r => r.Role)
            .Include(u => u.Articles)
            .Include(u => u.Comments);
    }

    public override User GetOneBy(Expression<Func<User, bool>> expression)
    {
       return _context.Set<User>()
            .Include(u => u.UserRole).ThenInclude(r => r.Role)
            .Include(u => u.Articles)
            .Include(u => u.Comments)
            .FirstOrDefault(expression);
    }
}


