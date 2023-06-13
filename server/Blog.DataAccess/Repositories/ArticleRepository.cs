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
        var articles = _context.Set<Article>()
         .Where(expression)
         .Include(a => a.Author)
         .Include(a => a.Comments)
             .ThenInclude(c => c.Reply)
             .Include(c => c.Author)
         .ToList();

        return articles.Select(a =>
        {
            a.Comments = FilterReplies(a.Comments.ToList());

            return a;
        });
    }

    public override Article? GetOneBy(Expression<Func<Article, bool>> expression)
    {
        var article = _context.Set<Article>()
            .Include(a => a.Author)
            .Include(a => a.Comments)
             .ThenInclude(c => c.Reply)
            .FirstOrDefault(expression);

        if(article != null && article.Comments != null)
        {
            article.Comments = FilterReplies(article.Comments.ToList());
        }
        
        return article;
    }
    private List<Comment> FilterReplies(List<Comment> comments)
    {
        return comments.Where(c => !c.IsReply).ToList();
    }
}
