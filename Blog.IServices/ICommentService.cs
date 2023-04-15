using Blog.Domain;
using Blog.Domain.SearchCriterias;

namespace Blog.IServices;

public interface ICommentService
{
    Comment CreateComment(Comment comment);
    Comment GetSpecificComment(int id);
    List<Comment> GetAllComments(CommentSearchCriteria searchCriteria);
}
