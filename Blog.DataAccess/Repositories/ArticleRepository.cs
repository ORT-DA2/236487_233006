using Blog.DataAccess.Contexts;
using Blog.Domain;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Blog.DataAccess;

public class ArticleRepository : BaseRepository<Article>
{
    public ArticleRepository(BlogContext context) : base(context){}

    public override IEnumerable<Article> GetAllBy(Expression<Func<Article, bool>> expression)
    {
        return _context.Set<Article>().Where(expression)
            .Include(a => a.Author)
            .Include(a => a.Comments).ThenInclude(c => c.Reply);
    }
}
