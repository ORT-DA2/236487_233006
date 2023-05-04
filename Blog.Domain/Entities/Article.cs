using Blog.Domain.Exceptions;
using System.ComponentModel.DataAnnotations;

namespace Blog.Domain;

public enum Template
{
    Left,
    Right,
    Center
}


public class Article
{
    public int Id { get; set; }

    [Required]
    public User Author { get; set; }

    [Required]
    public string Title { get; set; }

    [Required]
    public bool Private { get; set; }
    
    public ICollection<Comment>? Comments { get; set; }

    [Required]
    public string Content { get; set; }
    
    public string? Image { get; set; }

    [Required]
    public Template Template { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public DateTime? UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public void UpdateAttributes(Article article)
    {
        Title = article.Title;
        Content = article.Content;
        Private = article.Private;
        Image = article.Image;
        Template = article.Template;
        UpdatedAt = article.UpdatedAt;
        DeletedAt = article.DeletedAt;
    }

    public void ValidOrFail()
    {
        if (string.IsNullOrEmpty(Title) || string.IsNullOrEmpty(Content))
        {
            throw new InvalidResourceException("Title or content empty");
        }

        if(Author == null)
        {
            throw new InvalidResourceException("Author empty");
        }

        if (!Enum.IsDefined(typeof(Template), Template)) {
            throw new InvalidResourceException("Invalid template");
        }
    }
}