using Blog.Domain.Exceptions;

namespace Blog.Domain;

public class Comment
{
    public int Id { get; set; }
    
    public User Author { get; set; }
    
    public Comment? Reply { get; set; }
    
    public string Content { get; set; }
    
    public Article Article { get; set; }
    public DateTime CreatedAt { get; set; }
    
    public DateTime? UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public void ValidOrFail()
    {
        if (string.IsNullOrEmpty(Content))
            throw new InvalidResourceException("Content empty");

        if (Author == null) throw new InvalidResourceException("Author empty");

        if(Article == null) throw new InvalidResourceException("Article empty");
    }
}