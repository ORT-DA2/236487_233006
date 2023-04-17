using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Blog.DataAccess.Contexts;
using Blog.Domain.Entities;

namespace Blog.DataAccess;

public class SessionRepository : BaseRepository<Session>
{
    public SessionRepository(BlogContext context) : base(context)
    {
    }

    public override Session? GetOneBy(Expression<Func<Session, bool>> expression)
    {
        return _context.Set<Session>().Include(a => a.User).FirstOrDefault(expression);
    }
    
    public override void Insert(Session session)
    {
        _context.Entry(session.User).State = EntityState.Unchanged;
        _context.Set<Session>().Add(session);
    }
}