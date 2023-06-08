using Blog.Domain.Exceptions;
using System.ComponentModel.DataAnnotations;

namespace Blog.Domain;

public enum Template
{
    Left,
    Right,
    Center,
    TwoImages
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
    
    public string? FirstImage { get; set; }
    public string? SecondImage { get; set; }

    [Required]
    public Template Template { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public DateTime? UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public bool IsApproved { get; set; }

    public bool IsRejected { get; set; }

    public void UpdateAttributes(Article article)
    {
        Title = article.Title;
        Content = article.Content;
        Private = article.Private;
        FirstImage = article.FirstImage;
        SecondImage = article.SecondImage;
        Template = article.Template;
        UpdatedAt = article.UpdatedAt;
        DeletedAt = article.DeletedAt;
        IsApproved = article.IsApproved;
        IsRejected = article.IsRejected;
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

        if(Template != Template.TwoImages && !string.IsNullOrEmpty(SecondImage))
        {
            throw new InvalidResourceException("SecondImage is not available in the selected template");
        }
    }
}