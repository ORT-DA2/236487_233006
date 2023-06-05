using Blog.Domain;
using Models.Out;

namespace Models;

public class CommentDetailModel
{
    public int Id { get; set; }
    
    public UserDetailModelOut Author { get; set; }
    
    public int? ReplyId { get; set; }
    
    public string Content { get; set; }
    
    public int ArticleId { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public DateTime? UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public bool IsApproved { get; set; }

    public bool IsRejected { get; set; }

    public CommentDetailModel(Comment comment)
    {
        UserDetailModelOut author = new UserDetailModelOut(comment.Author);
        Id = comment.Id;
        Author = author;
        Content = comment.Content;
        if(comment.Reply != null) { ReplyId = comment.Reply.Id; }
        if(comment.Article != null) { ArticleId = comment.Article.Id; }
        CreatedAt = comment.CreatedAt;
        UpdatedAt = comment.UpdatedAt;
        DeletedAt = comment.DeletedAt;
        IsApproved = comment.IsApproved;
        IsRejected = comment.IsRejected;
    }
}
