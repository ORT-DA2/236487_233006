using Blog.DataAccess.Contexts;
using Blog.Domain;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Blog.DataAccess;

public class CommentRepository : BaseRepository<Comment>
{
    public CommentRepository(BlogContext context) : base(context){}

    public override IEnumerable<Comment> GetAllBy(Expression<Func<Comment, bool>> expression)
    {
        return _context.Set<Comment>().Where(expression)
            .Include(c => c.Author)
            .Include(c => c.Article)
            .Include(c => c.Reply);
    }

    public override Comment? GetOneBy(Expression<Func<Comment, bool>> expression)
    {
        return _context.Set<Comment>()
            .Include(c => c.Author)
            .Include(c => c.Article)
            .Include(c => c.Reply)
            .FirstOrDefault(expression);
    }
}
