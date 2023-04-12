using Blog.Domain.Exceptions;

namespace Blog.Domain.Tests;

[TestClass]
public class ArticleTests
{
    [TestMethod]
    public void ValidOrFailPassesWithValidArticle()
    {
        User author = new User
        {
            FirstName = "FirstName",
            LastName = "LastName",
            Username = "username",
            Email = "email@example.com",
            Password = "password1234"
        };
        var validArticle = new Article() { Title = "A title", Content = "A content", Author = author };
        validArticle.ValidOrFail();
    }

    [TestMethod]
    [ExpectedException(typeof(InvalidResourceException))]
    public void ValidOrFailThrowsExceptionWithInvalidArticle()
    {
        var validArticle = new Article() { Title = "", Content = "A content" };
        validArticle.ValidOrFail();
    }
}
