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

    public void ValidOrFail()
    {
        throw new NotImplementedException();
    }
}

public enum Template
{
    Left,
    Right,
    Center
}