using Blog.Domain;

namespace Models;

public class ArticleModel
{
    public int Id { get; set; }

    public User Author { get; set; }
    
    public string Title { get; set; }
    
    public string Type { get; set; }
    
    public ICollection<Comment> Comments { get; set; }
    
    public string Content { get; set; }
    
    public string Image { get; set; }
    
    public Template Template { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public DateTime UpdatedAt { get; set; }

    public DateTime DeletedAt { get; set; }

    public ArticleModel(Article article)
    {
        Id = article.Id;
        Author = article.Author;
        Title = article.Title;
        Content = article.Content;
        Type = article.Type;
        Comments = article.Comments;
        Image = article.Image;
        Template = article.Template;
        CreatedAt = article.CreatedAt;
        UpdatedAt = article.UpdatedAt;
        DeletedAt = article.DeletedAt;
    }
    
    public Article ToEntity()
    {
        return new Article()
        {
            Id = Id,
            Author = Author,
            Title = Title,
            Content = Content,
            Type = Type,
            Comments = Comments,
            Image = Image,
            Template = Template,
            CreatedAt = CreatedAt,
            UpdatedAt = UpdatedAt,
            DeletedAt = DeletedAt
        };
    }
    
    public override bool Equals(object? obj)
    {
        var model = obj as ArticleModel;
        return model.Id == Id;
    }
}