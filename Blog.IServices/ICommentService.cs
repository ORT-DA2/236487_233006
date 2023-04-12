using Blog.Domain;

namespace Blog.IServices;

public interface ICommentService
{
    Task<Comment> AddAsync(Comment comment);
    Task<Comment> GetByIdAsync(int id);
    Task<IEnumerable<Comment>> GetAllByArticleAsync(int id);
}