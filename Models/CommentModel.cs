using System.Net.Mime;
using Blog.Domain;

namespace Models;

public class CommentModel
{
    public int Id { get; set; }
    
    public User Author { get; set; }
    
    public Comment Reply { get; set; }
    
    public string Content { get; set; }
    
    public Article Article { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public DateTime UpdatedAt { get; set; }

    public DateTime DeletedAt { get; set; }
    
    public CommentModel(Comment comment)
    {
        Id = comment.Id;
        Author = comment.Author;
        Content = comment.Content;
        Reply = comment.Reply;
        Article = comment.Article;
        CreatedAt = comment.CreatedAt;
        UpdatedAt = comment.UpdatedAt;
        DeletedAt = comment.DeletedAt;
    }
    
    public Comment ToEntity()
    {
        return new Comment()
        {
            Id = Id,
            Author = Author,
            Content = Content,
            Reply = Reply,
            Article = Article,
            CreatedAt = CreatedAt,
            UpdatedAt = UpdatedAt,
            DeletedAt = DeletedAt
        };
    }
}