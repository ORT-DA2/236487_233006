using Blog.DataAccess.Contexts;
using Blog.Domain;
using Blog.IDataAccess;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Blog.DataAccess;

public class CommentRepository : ICommentRepository
{
    protected readonly BlogContext _context;

    public CommentRepository(BlogContext context)
    {
        _context = context;
    }

    public IEnumerable<Comment> GetAllBy(Expression<Func<Comment, bool>> expression)
    {
        return _context.Set<Comment>().Where(expression)
            .Include(c => c.Author)
            .Include(c => c.Article)
            .Include(c => c.Reply);
    }

    public Comment? GetOneBy(Expression<Func<Comment, bool>> expression)
    {
        return _context.Set<Comment>()
            .Include(c => c.Author)
            .Include(c => c.Article)
            .Include(c => c.Reply)
            .FirstOrDefault(expression);
    }

    public virtual void Insert(Comment elem)
    {
        _context.Set<Comment>().Add(elem);
    }

    public virtual void Delete(Comment elem)
    {
        _context.Set<Comment>().Remove(elem);
    }

    public virtual void Update(Comment elem)
    {
        _context.Set<Comment>().Update(elem);
    }

    public void Save()
    {
        _context.SaveChanges();
    }

    public void MarkAllArticleCommentsAsViewed(int articleId)
    {
        var comments = _context.Set<Comment>().Where(c => c.Article.Id == articleId).ToList();
        comments.ForEach(c => c.IsViewed = true);
        _context.SaveChanges();
    }
}
