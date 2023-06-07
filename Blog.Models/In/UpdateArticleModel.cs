using Blog.Domain;
using System.Net;

namespace Models;

public class UpdateArticleModel
{
    public string Title { get; set; }
    
    public bool Private { get; set; }
    
    public string Content { get; set; }
    
    public string? FirstImage { get; set; }
    public string? SecondImage { get; set; }

    public Template Template { get; set; }

    public bool IsApproved { get; set; }

    public bool IsRejected { get; set; }

    public Article ToUpdateEntity(User author)
    {
        return new Article()
        {
            Author = author,
            Title = Title,
            Content = Content,
            Private = Private,
            FirstImage = FirstImage,
            SecondImage = SecondImage,
            Template = Template,
            UpdatedAt = DateTime.Now,
            IsApproved = IsApproved,
            IsRejected = IsRejected,
        };
    }
}