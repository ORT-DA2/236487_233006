using Blog.Domain;
using Models.Out;

namespace Models;

public class RecentArticleModel
{
    public int Id { get; set; }

    public RecentArticleUserModel Author { get; set; }
    
    public string Title { get; set; }
    
    public bool Private { get; set; }
    
    public ICollection<Comment>? Comments { get; set; }
    
    public string Content { get; set; }
    
    public string? FirstImage { get; set; }

    public string? SecondImage { get; set; }

    public Template Template { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public DateTime? UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public RecentArticleModel(Article article)
    {
        if (article == null)
        {
            throw new ArgumentNullException(nameof(article));
        }

        Id = article.Id;
        Author = new RecentArticleUserModel(article.Author);
        Title = article.Title;
        Content = article.Content;
        Private = article.Private;
        Comments = article.Comments;
        FirstImage = article.FirstImage;
        SecondImage = article.SecondImage;
        Template = article.Template;
        CreatedAt = article.CreatedAt;
        UpdatedAt = article.UpdatedAt;
        DeletedAt = article.DeletedAt;
    }
}
