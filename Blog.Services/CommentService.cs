using Blog.Domain;
using Blog.IDataAccess;
using Blog.IServices;

namespace Blog.Services;

public class CommentService : ICommentService
{
    private readonly IRepository<Comment> _repository;

    public CommentService(IRepository<Comment> repository)
    {
        _repository = repository;
    }

    /*
    public async Task<Comment> AddAsync(Comment comment)
    {
        comment.ValidOrFail();
        return await _commentRepository.AddAsync(comment);
    }

    public async Task<Comment> GetByIdAsync(int commentId)
    {
        var comment = await _commentRepository.GetByIdAsync(commentId);

        if (comment == null)
            throw new ResourceNotFoundException($"Could not find specified comment {commentId}");

        return comment;
    }

    public async Task<IEnumerable<Comment>> GetAllByArticleAsync(int articleId)
    {
        return await _commentRepository.GetAllByArticleAsync(articleId);
    }
    */
}
