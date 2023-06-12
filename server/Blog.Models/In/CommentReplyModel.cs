using Blog.Domain;

namespace Models.In;

public class CommentReplyModel
{
    public int AuthorId { get; set; }

    public string Content { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public bool IsApproved { get; set; }

    public bool IsViewed { get; set; }

    public bool IsRejected { get; set; }

    public bool IsReply { get; set; }

    public Comment ToCreateEntity(User author) 
    {
        return new Comment()
        {
            Author = author,
            Content = Content,
            CreatedAt = DateTime.Now,
            IsViewed = IsViewed,
            IsApproved = IsApproved,
            IsRejected = IsRejected,
            IsReply = IsReply
        };
    }
}
