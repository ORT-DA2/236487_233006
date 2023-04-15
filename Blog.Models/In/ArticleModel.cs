using Blog.Domain;
using System.Text.Json.Serialization;

namespace Models;

public class ArticleModel
{
    public int AuthorId { get; set; }
    
    public string Title { get; set; }
    
    public string Type { get; set; }
    
    public ICollection<Comment>? Comments { get; set; }
    
    public string Content { get; set; }
    
    public string? Image { get; set; }
    
    public Template Template { get; set; }
    
    public DateTime CreatedAt { get; set; }

    public Article ToCreateEntity(User author)
    {
        return new Article()
        {
            Author = author,
            Title = Title,
            Content = Content,
            Type = Type,
            Comments = Comments,
            Image = Image,
            Template = Template,
            CreatedAt = DateTime.Now
        };
    }

    public Article ToEntity(User author)
    {
        return new Article()
        {
            Author = author,
            Title = Title,
            Content = Content,
            Type = Type,
            Comments = Comments,
            Image = Image,
            Template = Template,
            CreatedAt = CreatedAt
        };
    }
}