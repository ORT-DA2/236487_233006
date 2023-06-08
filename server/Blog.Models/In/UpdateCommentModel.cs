using Blog.Domain;

namespace Models.In;

public class UpdateCommentModel
{
    public string Content { get; set; }

    public bool IsViewed { get; set; }

    public bool IsApproved { get; set; }

    public bool IsRejected { get; set; }

    public Comment ToUpdateEntity(User author, Article article)
    {
        return new Comment()
        {
            Author = author,
            Article = article,
            Content = Content,
            UpdatedAt = DateTime.Now,
            IsViewed = IsViewed,
            IsApproved = IsApproved,
            IsRejected = IsRejected,
        };
    }
}
