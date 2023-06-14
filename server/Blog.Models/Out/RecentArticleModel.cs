using Blog.Domain;
using Models.Out;

namespace Models;

public class RecentArticleModel
{
    public int Id { get; set; }

    public UserDetailModelOut Author { get; set; }
    
    public string Title { get; set; }
    
    public bool Private { get; set; }

    public List<CommentDetailModel>? Comments { get; set; }

    public string Content { get; set; }
    
    public string? FirstImage { get; set; }

    public string? SecondImage { get; set; }

    public Template Template { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public DateTime? UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public bool IsApproved { get; set; }

    public bool IsRejected { get; set; }

    public RecentArticleModel(Article article)
    {
        if (article == null)
        {
            throw new ArgumentNullException(nameof(article));
        }

        List<CommentDetailModel>? comments = null;

        if (article.Comments != null)
        {
            comments = article.Comments.Select(c => new CommentDetailModel(c)).ToList();
        }


        Id = article.Id;
        Author = new UserDetailModelOut(article.Author);
        Title = article.Title;
        Content = article.Content;
        Private = article.Private;
        Comments = comments;
        FirstImage = article.FirstImage;
        SecondImage = article.SecondImage;
        Template = article.Template;
        CreatedAt = article.CreatedAt;
        UpdatedAt = article.UpdatedAt;
        DeletedAt = article.DeletedAt;
        IsApproved = article.IsApproved;
        IsRejected = article.IsRejected;
    }
}
