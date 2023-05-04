using Blog.Domain;

namespace Models.In;

public class CommentReplyModel
{
    public int AuthorId { get; set; }

    public string Content { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public Comment ToCreateEntity(User author, Article article)
    {
        return new Comment()
        {
            Author = author,
            Article = article,
            Content = Content,
            CreatedAt = DateTime.Now,
        };
    }
}
