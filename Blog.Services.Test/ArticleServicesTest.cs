using System.Linq.Expressions;
using Blog.Domain;
using Blog.Domain.Exceptions;
using Blog.Domain.SearchCriterias;
using Blog.IDataAccess;
using Moq;

namespace Blog.Services.Test;

[TestClass]
public class ArticleServicesTest
{
    private Mock<IRepository<Article>> _repoMock;
    private ArticleService _articleService;

    [TestInitialize]
    public void Setup()
    {
        _repoMock = new Mock<IRepository<Article>>(MockBehavior.Strict);
        _articleService = new ArticleService(_repoMock.Object);
    }

    [TestCleanup]
    public void Cleanup()
    {
        _repoMock.VerifyAll();
    }

    [TestMethod]
    public void GetAllArticles_ReturnsExpectedArticles()
    {
        // Arrange
        var searchCriteria = new ArticleSearchCriteria();
        var articleList = new List<Article> { new Article { Id = 1, Title = "Article 1" }, new Article { Id = 2, Title = "Article 2" } };
        _repoMock.Setup(repo => repo.GetAllBy(It.IsAny<Expression<Func<Article, bool>>>())).Returns(articleList.AsQueryable());

        // Act
        var result = _articleService.GetAllArticles(searchCriteria, null, null, null);

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(2, result.Count);
    }



    [TestMethod]
    [ExpectedException(typeof(ResourceNotFoundException))]
    public void GetSpecificArticle_NonExistingArticle_ThrowsResourceNotFoundException()
    {
        // Arrange
        int nonExistingArticleId = 1;
        _repoMock.Setup(repo => repo.GetOneBy(a => a.Id == nonExistingArticleId)).Returns(default(Article));

        // Act
        _articleService.GetSpecificArticle(nonExistingArticleId);
    }

    [TestMethod]
    public void CreateArticle_InsertsAndSavesNewArticle()
    {
        // Arrange
        var newArticle = new Article { Id = 1, Title = "New Article", Content = "New article content", Author = new User() };
        _repoMock.Setup(repo => repo.Insert(newArticle)).Verifiable();
        _repoMock.Setup(repo => repo.Save()).Verifiable();

        // Act
        _articleService.CreateArticle(newArticle);

        // Assert
        _repoMock.Verify();
    }


    [TestMethod]
    public void UpdateArticle_UpdatesArticleAttributes()
    {
        // Arrange
        var existingArticle = new Article { Id = 1, Title = "Existing Article", Content = "Existing article content", Author = new User(), Template = Template.Left, Private = false };
        var updatedArticle = new Article { Title = "Updated Article", Content = "Updated article content", Author = new User(), Template = Template.Center, Private = true };
        _repoMock.Setup(repo => repo.GetOneBy(It.IsAny<Expression<Func<Article, bool>>>())).Returns(existingArticle);
        _repoMock.Setup(repo => repo.Update(existingArticle)).Verifiable();
        _repoMock.Setup(repo => repo.Save()).Verifiable();

        // Act
        _articleService.UpdateArticle(existingArticle.Id, updatedArticle);

        // Assert
        Assert.AreEqual(updatedArticle.Title, existingArticle.Title);
        Assert.AreEqual(updatedArticle.Content, existingArticle.Content);
        Assert.AreEqual(updatedArticle.Template, existingArticle.Template);
        Assert.AreEqual(updatedArticle.Private, existingArticle.Private);
        _repoMock.Verify();
    }

    [TestMethod]
    public void DeleteArticle_SetsDeletedAtAndUpdatesArticle()
    {
        // Arrange
        var existingArticle = new Article { Id = 1, Title = "Existing Article", Content = "Existing article content", Author = new User(), Template = Template.Left, Private = false };
        _repoMock.Setup(repo => repo.GetOneBy(It.IsAny<Expression<Func<Article, bool>>>())).Returns(existingArticle);
        _repoMock.Setup(repo => repo.Update(existingArticle)).Verifiable();
        _repoMock.Setup(repo => repo.Save()).Verifiable();

        // Act
        _articleService.DeleteArticle(existingArticle.Id);

        // Assert
        Assert.IsNotNull(existingArticle.DeletedAt);
        _repoMock.Verify();
    }

    [TestMethod]
    [ExpectedException(typeof(ResourceNotFoundException))]
    public void DeleteArticle_NonExistingArticle_ThrowsResourceNotFoundException()
    {
        // Arrange
        int nonExistingArticleId = 1;
        _repoMock.Setup(repo => repo.GetOneBy(a => a.Id == nonExistingArticleId)).Returns(default(Article));

        // Act
        _articleService.DeleteArticle(nonExistingArticleId);
    }

    [TestMethod]
    public void GetAllArticles_ReturnsFilteredAndSortedArticles()
    {
        // Arrange
        var article1 = new Article { Id = 1, Title = "First Article", Content = "First article content", Author = new User(), Template = Template.Left, Private = false, CreatedAt = DateTime.Now.AddDays(-2) };
        var article2 = new Article { Id = 2, Title = "Second Article", Content = "Second article content", Author = new User(), Template = Template.Center, Private = true, CreatedAt = DateTime.Now.AddDays(-1) };
        var article3 = new Article { Id = 3, Title = "Third Article", Content = "Third article content", Author = new User(), Template = Template.Right, Private = false, CreatedAt = DateTime.Now };
        var articles = new List<Article> { article1, article2, article3 };

        var searchCriteria = new ArticleSearchCriteria();
        _repoMock.Setup(repo => repo.GetAllBy(It.IsAny<Expression<Func<Article, bool>>>())).Returns(articles.AsQueryable());

        // Act
        var result = _articleService.GetAllArticles(searchCriteria, "CreatedAt", "desc", null);

        // Assert
        Assert.AreEqual(3, result.Count);
        Assert.AreEqual(article3.Title, result[0].Title);
        Assert.AreEqual(article2.Title, result[1].Title);
        Assert.AreEqual(article1.Title, result[2].Title);
    }

    [TestMethod]
    public void GetSpecificArticle_ReturnsArticleById()
    {
        // Arrange
        var article = new Article { Id = 1, Title = "First Article", Content = "First article content", Author = new User(), Template = Template.Left, Private = false };
        _repoMock.Setup(repo => repo.GetOneBy(It.IsAny<Expression<Func<Article, bool>>>())).Returns(article);

        // Act
        var result = _articleService.GetSpecificArticle(article.Id);

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(article.Id, result.Id);
        Assert.AreEqual(article.Title, result.Title);
        Assert.AreEqual(article.Content, result.Content);
        Assert.AreEqual(article.Author, result.Author);
        Assert.AreEqual(article.Template, result.Template);
        Assert.AreEqual(article.Private, result.Private);
    }

    [TestMethod]
    public void GetAllArticles_ReturnsOnlyNonDeletedArticles()
    {
        // Arrange
        var article1 = new Article { Id = 1, Title = "First Article", Content = "First article content", Author = new User(), Template = Template.Left, Private = false, DeletedAt = null };
        var article2 = new Article { Id = 2, Title = "Second Article", Content = "Second article content", Author = new User(), Template = Template.Center, Private = true, DeletedAt = DateTime.Now };
        var articles = new List<Article> { article1, article2 };

        var searchCriteria = new ArticleSearchCriteria();
        _repoMock.Setup(repo => repo.GetAllBy(It.IsAny<Expression<Func<Article, bool>>>())).Returns(articles.AsQueryable());

        // Act
        var result = _articleService.GetAllArticles(searchCriteria, null, null, null);

        // Assert
        Assert.AreEqual(1, result.Count);
        Assert.AreEqual(article1.Title, result[0].Title);
    }

    [TestMethod]
    public void GetAllArticles_ReturnsLimitedNumberOfArticles()
    {
        // Arrange
        var article1 = new Article { Id = 1, Title = "First Article", Content = "First article content", Author = new User(), Template = Template.Left, Private = false, DeletedAt = null };
        var article2 = new Article { Id = 2, Title = "Second Article", Content = "Second article content", Author = new User(), Template = Template.Center, Private = true, DeletedAt = null };
        var articles = new List<Article> { article1, article2 };

        var searchCriteria = new ArticleSearchCriteria();
        _repoMock.Setup(repo => repo.GetAllBy(It.IsAny<Expression<Func<Article, bool>>>())).Returns(articles.AsQueryable());

        // Act
        var result = _articleService.GetAllArticles(searchCriteria, null, null, 1);

        // Assert
        Assert.AreEqual(1, result.Count);
        Assert.AreEqual(article1.Title, result[0].Title);
    }


}
