using Blog.Domain.Exceptions;

namespace Blog.WebApi.Tests;

using Blog.IServices;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Blog.Domain;
using Blog.WebApi.Controllers;
using Models;
using System.Net;
using System.Collections.Generic;
using Blog.Domain.SearchCriterias;

[TestClass]
public class ArticleControllerTest
{
    private Mock<IArticleService> _articleServiceMock;
    private Mock<IUserService> _userServiceMock;
    private Mock<ISessionService> _sessionServiceMock;

    [TestInitialize]
    public void Setup()
    {
        _articleServiceMock = new Mock<IArticleService>(MockBehavior.Strict);
        _userServiceMock = new Mock<IUserService>(MockBehavior.Strict);
        _sessionServiceMock = new Mock<ISessionService>(MockBehavior.Strict);
    }

    [TestCleanup]
    public void Cleanup()
    {
        _articleServiceMock.VerifyAll();
        _userServiceMock.VerifyAll();
    }

    [TestMethod]
    public void GetExistingArticleReturnsAsExpectedWhenArticleExistsAndIsPublic()
    {
        User currentUser = CreateUser(1);
        var article = CreateArticle(1);
        _sessionServiceMock.Setup(service => service.GetCurrentUser(null)).Returns(currentUser);
        _articleServiceMock.Setup(service => service.GetSpecificArticle(It.IsAny<int>())).Returns(article);
        var controller = new ArticleController(_articleServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object);

        var response = controller.GetArticle(article.Id) as OkObjectResult;

        ArticleDetailModel expected = new ArticleDetailModel(article);

        Assert.AreEqual((int)HttpStatusCode.OK, response.StatusCode);
        Assert.AreEqual(expected, response.Value);
    }

    [TestMethod]
    public void GetExistingArticleShouldReturnUnauthorizedWhenArticleExistsAndIsPrivateButCurrentUserIsNotAuthor()
    {
        User currentUser = CreateUser(2);
        var article = CreateArticle(1, true);
        _sessionServiceMock.Setup(service => service.GetCurrentUser(null)).Returns(currentUser);
        _articleServiceMock.Setup(service => service.GetSpecificArticle(It.IsAny<int>())).Returns(article);
        var controller = new ArticleController(_articleServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object);

        var result = controller.GetArticle(article.Id);

        Assert.IsInstanceOfType(result, typeof(UnauthorizedObjectResult));
        var unauthorizedResult = result as UnauthorizedObjectResult;
        Assert.AreEqual("Cannot see private article", unauthorizedResult.Value);
    }

    [TestMethod]
    public void GetAllArticlesReturnsAsExpected()
    {
        User currentUser = CreateUser(2);
        var articles = new List<Article>
        {
            CreateArticle(1),
            CreateArticle(2, true)
        };
        ArticleSearchCriteria criteria = new ArticleSearchCriteria();
        _sessionServiceMock.Setup(service => service.GetCurrentUser(null)).Returns(currentUser);
        _articleServiceMock.Setup(service => service.GetAllArticles(criteria, null, null, null)).Returns(articles);
        
        var controller = new ArticleController(_articleServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object);

        var result = controller.GetArticles(criteria, null, null, null) as OkObjectResult;

        var articlesResult = result.Value as IEnumerable<ArticleDetailModel>;

        int publicArticles = articles.Where(a => !a.Private).Count();

        Assert.IsNotNull(articlesResult);
        Assert.AreEqual(publicArticles, articlesResult.Count());
    }

    [TestMethod]
    public void CreateNewArticleReturnCreatedAtRoutedWithCreatedArticleAsExpected()
    {
        var article = CreateArticle(1);
        var author = CreateUser(1);

        _sessionServiceMock.Setup(service => service.GetCurrentUser(null)).Returns(author);
        _articleServiceMock.Setup(service => service.CreateArticle(It.IsAny<Article>())).Returns(article);

        var controller = new ArticleController(_articleServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object);

        var newArticle = new ArticleModel() { Title = article.Title, Content = article.Content, AuthorId = article.Author.Id, Private = article.Private, Template = article.Template, CreatedAt = article.CreatedAt };

        var result = controller.CreateArticle(newArticle);

        var createdResult = result as CreatedAtRouteResult;

        Assert.AreEqual("GetArticle", createdResult.RouteName);
        Assert.AreEqual(article.Id, createdResult.RouteValues["articleId"]);

        var articleResult = createdResult.Value as ArticleDetailModel;
        Assert.AreEqual(article.Id, articleResult.Id);
        Assert.AreEqual(article.Title, articleResult.Title);
        Assert.AreEqual(article.Content, articleResult.Content);
    }

    [TestMethod]
    public void UpdateAnArticleReturnUpdatedArticleAsExpected()
    {
        var article = CreateArticle(1);
        var author = CreateUser(1);

        _sessionServiceMock.Setup(service => service.GetCurrentUser(null)).Returns(author);
        _userServiceMock.Setup(service => service.GetSpecificUser(It.IsAny<int>())).Returns(author);
        _articleServiceMock.Setup(service => service.UpdateArticle(It.IsAny<int>(),It.IsAny<Article>())).Returns(article);

        var controller = new ArticleController(_articleServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object);

        var updatedArticle = new ArticleModel() { Title = article.Title, Content = article.Content, AuthorId = article.Author.Id, Private = article.Private, Template = article.Template, CreatedAt = article.CreatedAt };

        var result = controller.UpdateArticle(article.Id, updatedArticle);

        var createdResult = result as CreatedAtRouteResult;

        Assert.AreEqual("GetArticle", createdResult.RouteName);
        Assert.AreEqual(article.Id, createdResult.RouteValues["articleId"]);

        var articleResult = createdResult.Value as ArticleDetailModel;
        Assert.AreEqual(article.Id, articleResult.Id);
        Assert.AreEqual(article.Title, articleResult.Title);
        Assert.AreEqual(article.Content, articleResult.Content);
    }

    [TestMethod]
    public void DeleteAnArticleReturnNoContent()
    {
        var article = CreateArticle(1);

        _sessionServiceMock.Setup(service => service.GetCurrentUser(null)).Returns(article.Author);
        _articleServiceMock.Setup(service => service.DeleteArticle(It.IsAny<int>()));

        var controller = new ArticleController(_articleServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object);

        var result = controller.DeleteArticle(article.Id) as NoContentResult;

        Assert.IsNotNull(result);

        _articleServiceMock.Verify(s => s.DeleteArticle(article.Id), Times.Once);
    }

    [TestMethod]
public void GetExistingArticleReturnsAsExpectedWhenArticleExistsAndIsPrivateAndCurrentUserIsAuthor()
{
    User currentUser = CreateUser(1);
    var article = CreateArticle(1, true);
    _sessionServiceMock.Setup(service => service.GetCurrentUser(null)).Returns(currentUser);
    _articleServiceMock.Setup(service => service.GetSpecificArticle(It.IsAny<int>())).Returns(article);
    var controller = new ArticleController(_articleServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object);

    var response = controller.GetArticle(article.Id) as OkObjectResult;

    ArticleDetailModel expected = new ArticleDetailModel(article);

    Assert.AreEqual((int)HttpStatusCode.OK, response.StatusCode);
    Assert.AreEqual(expected, response.Value);
}

[TestMethod]
public void UpdateAnArticleReturnUnauthorizedWhenCurrentUserIsNotAuthor()
{
    User currentUser = CreateUser(2);
    User author = CreateUser(1);
    var article = CreateArticle(1);

    _sessionServiceMock.Setup(service => service.GetCurrentUser(null)).Returns(currentUser);
    _userServiceMock.Setup(service => service.GetSpecificUser(It.IsAny<int>())).Returns(author);
    _articleServiceMock.Setup(service => service.UpdateArticle(It.IsAny<int>(), It.IsAny<Article>())).Returns(article);

    var controller = new ArticleController(_articleServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object);

    var updatedArticle = new ArticleModel() { Title = article.Title, Content = article.Content, AuthorId = article.Author.Id, Private = article.Private, Template = article.Template, CreatedAt = article.CreatedAt };

    var result = controller.UpdateArticle(article.Id, updatedArticle);

    Assert.IsInstanceOfType(result, typeof(UnauthorizedObjectResult));
    var unauthorizedResult = result as UnauthorizedObjectResult;
    Assert.AreEqual("Cannot update this article", unauthorizedResult.Value);
}

[TestMethod]
public void GetArticles_ReturnsOnlyNonPrivateArticlesOrPrivateArticlesWithCurrentUserAsAuthor()
{
    User currentUser = CreateUser(1);
    var articles = new List<Article>
    {
        CreateArticle(1),
        CreateArticle(2, true),
        CreateArticle(3, true)
    };
    ArticleSearchCriteria criteria = new ArticleSearchCriteria();
    _sessionServiceMock.Setup(service => service.GetCurrentUser(null)).Returns(currentUser);
    _articleServiceMock.Setup(service => service.GetAllArticles(criteria, null, null, null)).Returns(articles);

    var controller = new ArticleController(_articleServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object);

    var result = controller.GetArticles(criteria, null, null, null) as OkObjectResult;

    var articlesResult = result.Value as IEnumerable<ArticleDetailModel>;

    Assert.IsNotNull(articlesResult);
    Assert.AreEqual(3, articlesResult.Count());
}


private Article CreateArticle(int articleId, bool isPrivate = false)
    {
        return new Article()
        {
            Id = articleId,
            Title = "Title",
            Content = "Content",
            Private = isPrivate,
            Template = Template.Left,
            CreatedAt = DateTime.Now,
            Author = CreateUser(1)
        };
    }

    private User CreateUser(int authorId)
    {
        return new User()
        {
            Id = authorId,
            FirstName = "Firstname",
            LastName = "Lastname",
            Password = "Password",
            Email = "email@gmail.com",
            Username = "username"
        };
    }

}
