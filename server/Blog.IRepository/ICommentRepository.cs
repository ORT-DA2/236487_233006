using Blog.Domain;

namespace Blog.IRepository;

public interface ICommentRepository
{
    Task<Comment> AddAsync(Comment comment);
    Task<Comment> GetByIdAsync(int id);
    Task<IEnumerable<Comment>> GetAllByArticleAsync(int id);
}