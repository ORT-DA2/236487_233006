using Blog.Domain;
using System.Linq.Expressions;

namespace Blog.IDataAccess
{
    public interface ICommentRepository
    {
        void MarkAllArticleCommentsAsViewed(int articleId);
        IEnumerable<Comment> GetAllBy(Expression<Func<Comment, bool>> expression);
        Comment? GetOneBy(Expression<Func<Comment, bool>> expression);
        void Insert(Comment elem);
        void Delete(Comment elem);
        void Update(Comment elem);
        void Save();
    }
}
