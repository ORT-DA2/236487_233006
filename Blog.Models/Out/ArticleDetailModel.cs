using Blog.Domain;

namespace Models;

public class ArticleDetailModel
{
    public int Id { get; set; }

    public int AuthorId { get; set; }
    
    public string Title { get; set; }
    
    public string Type { get; set; }
    
    public ICollection<Comment>? Comments { get; set; }
    
    public string Content { get; set; }
    
    public string? Image { get; set; }
    
    public Template Template { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public DateTime? UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public ArticleDetailModel(Article article)
    {
        Id = article.Id;
        AuthorId = article.Author.Id;
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
    
    public Article ToEntity(User author)
    {
        return new Article()
        {
            Id = Id,
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
        var model = obj as ArticleDetailModel;
        return model.Id == Id;
    }
}