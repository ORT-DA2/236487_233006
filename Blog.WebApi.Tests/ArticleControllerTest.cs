using Blog.Domain;
using Blog.IRepository;
using Blog.IServices;
using Blog.WebApi.Controllers;
using Models;
using Moq;

namespace Blog.WebApi.Tests;

[TestClass]
public class ArticleControllerTest
{
    private Mock<IArticleService> _articleRepositoryMock;
    private Mock<ICommentService> _commentRepositoryMock;
    
    [TestInitialize]
    public void setup()
    {
        _articleRepositoryMock = new Mock<IArticleService>(MockBehavior.Strict);
        _commentRepositoryMock = new Mock<ICommentService>(MockBehavior.Strict);
    }

    [TestCleanup]
    public void Cleanup()
    {
        _articleRepositoryMock.VerifyAll();
        _commentRepositoryMock.VerifyAll();
    }

    [TestMethod]
    public void TestMethod1()
    {
        var article = CreateArticle();
        var expectedArticle = new ArticleModel(article);
        _articleRepositoryMock.Setup(repository => repository.GetByIdAsync(It.IsAny<int>())).ReturnsAsync(article);
        var controller = new ArticleController(_articleRepositoryMock.Object, _commentRepositoryMock.Object);
    }
    
    private Article CreateArticle()
    {
        return new Article()
        {
            Id = 1,
            Title = "Title",
            Content = "Content",
            Type = "private",
            Template = Template.Left,
            CreatedAt = DateTime.Now,
        };
    }
}