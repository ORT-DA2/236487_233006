using System.Net.Mime;
using Blog.Domain;

namespace Models;

public class CommentDetailModel
{
    public int Id { get; set; }
    
    public int AuthorId { get; set; }
    
    public int? ReplyId { get; set; }
    
    public string Content { get; set; }
    
    public int ArticleId { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public DateTime? UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }
    
    public CommentDetailModel(Comment comment)
    {
        Id = comment.Id;
        AuthorId = comment.Author.Id;
        Content = comment.Content;
        if(comment.Reply != null) { ReplyId = comment.Reply.Id; }
        if(comment.Article != null) { ArticleId = comment.Article.Id; }
        CreatedAt = comment.CreatedAt;
        UpdatedAt = comment.UpdatedAt;
        DeletedAt = comment.DeletedAt;
    }
}
