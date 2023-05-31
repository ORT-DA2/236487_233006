using Blog.Domain;

namespace Models;

public class ArticleModel
{
    public int AuthorId { get; set; }

    public string Title { get; set; }
    
    public bool Private { get; set; }
    
    public ICollection<Comment>? Comments { get; set; }
    
    public string Content { get; set; }
    
    public string? FirstImage { get; set; }
    public string? SecondImage { get; set; }

    public Template Template { get; set; }
    
    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public Article ToCreateEntity(User author)
    {
        return new Article()
        {
            Author = author,
            Title = Title,
            Content = Content,
            Private = Private,
            Comments = Comments,
            FirstImage = FirstImage,
            SecondImage = SecondImage,
            Template = Template,
            CreatedAt = DateTime.Now
        };
    }

    public Article ToUpdateEntity(User author)
    {
        return new Article()
        {
            Author = author,
            Title = Title,
            Content = Content,
            Private = Private,
            Comments = Comments,
            FirstImage = FirstImage,
            SecondImage = SecondImage,
            Template = Template,
            UpdatedAt = DateTime.Now
        };
    }
}