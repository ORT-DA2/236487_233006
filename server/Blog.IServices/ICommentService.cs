using Blog.Domain;
using Blog.Domain.SearchCriterias;

namespace Blog.IServices;

public interface ICommentService
{
    Comment CreateComment(Comment comment);
    Comment GetSpecificComment(int id);

    Comment UpdateComment(int id, Comment updatedComment);

    List<Comment> GetAllComments(CommentSearchCriteria searchCriteria);
    void MarkAllArticleCommentsAsViewed(int articleId);
}
