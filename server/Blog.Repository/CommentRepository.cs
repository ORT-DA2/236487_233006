using Blog.Domain;
using Blog.IRepository;

namespace Blog.Repository;

public class CommentRepository : ICommentRepository
{
    public Task<Comment> AddAsync(Comment comment)
    {
        throw new NotImplementedException();
    }

    public Task<Comment> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Comment>> GetAllByArticleAsync(int id)
    {
        throw new NotImplementedException();
    }
}