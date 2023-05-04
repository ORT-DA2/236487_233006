using Blog.Domain.Exceptions;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Blog.Domain;

public class Comment
{
    public int Id { get; set; }

    [Required]
    [JsonIgnore]
    public User Author { get; set; }
    
    public Comment? Reply { get; set; }

    [Required]
    public string Content { get; set; }

    [JsonIgnore]
    public Article? Article { get; set; }
    public DateTime CreatedAt { get; set; }
    
    public DateTime? UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public bool IsViewed { get; set; }

    public void ValidOrFail()
    {
        if (string.IsNullOrEmpty(Content))
            throw new InvalidResourceException("Content empty");

        if (Author == null) throw new InvalidResourceException("Author empty");

        if(Article == null) throw new InvalidResourceException("Article empty");
    }

    public void UpdateAttributes(Comment comment)
    {
        Author = comment.Author;
        Content = comment.Content;
        Reply = comment.Reply;
        CreatedAt = comment.CreatedAt;
        UpdatedAt = comment.UpdatedAt;
        DeletedAt = comment.DeletedAt;
        IsViewed = comment.IsViewed;
    }
}