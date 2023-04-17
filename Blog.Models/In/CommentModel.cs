using Blog.Domain;

namespace Models.In;

public class CommentModel
{
    public int AuthorId { get; set; }

    public Comment? Reply { get; set; }

    public string Content { get; set; }

    public int ArticleId { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public Comment ToEntity(User author, Article article)
    {
        return new Comment()
        {
            Author = author,
            Content = Content,
            Reply = Reply,
            Article = article,
            CreatedAt = CreatedAt,
            UpdatedAt = UpdatedAt,
            DeletedAt = DeletedAt
        };
    }

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
