using Blog.Domain;
using Models.Out;

namespace Models;

public class CommentDetailModel
{
    public int Id { get; set; }
    
    public UserDetailModelOut Author { get; set; }
    
    public CommentDetailModel? Reply { get; set; }
    
    public string Content { get; set; }
    
    public int ArticleId { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public DateTime? UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public bool IsViewed { get; set; }

    public bool IsApproved { get; set; }

    public bool IsRejected { get; set; }

    public CommentDetailModel(Comment comment)
    {
        UserDetailModelOut author = new UserDetailModelOut(comment.Author);
        CommentDetailModel reply = null;
        if (comment.Reply != null)
        {
            reply = new CommentDetailModel(comment.Reply);
        }
        Id = comment.Id;
        Author = author;
        Content = comment.Content;
        Reply = reply;
        if(comment.Article != null) { ArticleId = comment.Article.Id; }
        CreatedAt = comment.CreatedAt;
        UpdatedAt = comment.UpdatedAt;
        DeletedAt = comment.DeletedAt;
        IsViewed = comment.IsViewed;
        IsApproved = comment.IsApproved;
        IsRejected = comment.IsRejected;
    }
}
