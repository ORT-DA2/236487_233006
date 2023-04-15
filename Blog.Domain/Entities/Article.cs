using Blog.Domain.Exceptions;

namespace Blog.Domain;

public class Article
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

    public void UpdateAttributes(Article article)
    {
        Title = article.Title;
        Content = article.Content;
        Type = article.Type;
        Image = article.Image;
        Template = article.Template;    
    }

    public void ValidOrFail()
    {
        if (string.IsNullOrEmpty(Title) || string.IsNullOrEmpty(Content))
            throw new InvalidResourceException("Title or content empty");

        if(Author == null) throw new InvalidResourceException("Author empty");
    }
}

public enum Template
{
    Left,
    Right,
    Center
}