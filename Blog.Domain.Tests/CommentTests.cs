using Blog.Domain.Exceptions;

namespace Blog.Domain.Tests;

[TestClass]
public class CommentTests
{
    private User _author;
    private Article _article;

    [TestInitialize]
    public void Initialize()
    {
        _author = new User
        {
            FirstName = "FirstName",
            LastName = "LastName",
            Username = "username",
            Email = "email@example.com",
            Password = "password1234"
        };

        _article = new Article() { Title = "A title", Content = "A content", Author = _author };
    }

    [TestMethod]
    public void ValidOrFailPassesWithValidComment()
    {
        var validComment = new Comment() { Content = "A content", Article = _article, Author = _author };
        validComment.ValidOrFail();
    }

    [TestMethod]
    [ExpectedException(typeof(InvalidResourceException))]
    public void ValidOrFailThrowsExceptionWithInvalidArticle()
    {
        var validComment = new Comment() { Content = "", Article = _article, Author = _author };
        validComment.ValidOrFail();
    }
}
