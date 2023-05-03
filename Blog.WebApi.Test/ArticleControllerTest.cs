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
    private Mock<ICommentService> _commentServiceMock;
    private ArticleController _articleController;

    [TestInitialize]
    public void Setup()
    {
        _articleServiceMock = new Mock<IArticleService>(MockBehavior.Strict);
        _userServiceMock = new Mock<IUserService>(MockBehavior.Strict);
        _sessionServiceMock = new Mock<ISessionService>(MockBehavior.Strict);
        _commentServiceMock = new Mock<ICommentService>(MockBehavior.Strict);
        _articleController = new ArticleController(_articleServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object, _commentServiceMock.Object);
    }

    [TestCleanup]
    public void Cleanup()
    {
        _articleServiceMock.VerifyAll();
        _userServiceMock.VerifyAll();
        _sessionServiceMock.VerifyAll();
        _commentServiceMock.VerifyAll();
    }

    [TestMethod]
    public void GetExistingArticleReturnsAsExpectedWhenArticleExistsAndIsPublic()
    {
        User currentUser = CreateUser(1);
        var article = CreateArticle(1);
        _sessionServiceMock.Setup(service => service.GetCurrentUser(null)).Returns(currentUser);
        _articleServiceMock.Setup(service => service.GetSpecificArticle(It.IsAny<int>())).Returns(article);
        var controller = new ArticleController(_articleServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object, _commentServiceMock.Object);

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
        var controller = new ArticleController(_articleServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object, _commentServiceMock.Object);

        var result = controller.GetArticle(article.Id);

        Assert.IsInstanceOfType(result, typeof(UnauthorizedObjectResult));
        var unauthorizedResult = result as UnauthorizedObjectResult;
        Assert.AreEqual("You are not authorized to perform this action", unauthorizedResult.Value);
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
        
        var controller = new ArticleController(_articleServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object, _commentServiceMock.Object);

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

        var controller = new ArticleController(_articleServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object, _commentServiceMock.Object);

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

        var controller = new ArticleController(_articleServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object, _commentServiceMock.Object);

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
        User currentUser = CreateUser(1);

        _sessionServiceMock.Setup(service => service.GetCurrentUser(null)).Returns(currentUser);
        _articleServiceMock.Setup(service => service.GetSpecificArticle(It.IsAny<int>())).Returns(article);
        _articleServiceMock.Setup(service => service.DeleteArticle(It.IsAny<int>()));

        var controller = new ArticleController(_articleServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object, _commentServiceMock.Object);

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
        var controller = new ArticleController(_articleServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object, _commentServiceMock.Object);

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

        var controller = new ArticleController(_articleServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object, _commentServiceMock.Object);

        var updatedArticle = new ArticleModel() { Title = article.Title, Content = article.Content, AuthorId = article.Author.Id, Private = article.Private, Template = article.Template, CreatedAt = article.CreatedAt };

        var result = controller.UpdateArticle(article.Id, updatedArticle);

        Assert.IsInstanceOfType(result, typeof(UnauthorizedObjectResult));
        var unauthorizedResult = result as UnauthorizedObjectResult;
        Assert.AreEqual("You are not authorized to perform this action", unauthorizedResult.Value);
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

        var controller = new ArticleController(_articleServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object, _commentServiceMock.Object);

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

        [TestMethod]
    public void MarkAllCommentsAsViewed_UnauthorizedUser_ReturnsUnauthorizedResult()
    {
        // Arrange
        var articleId = 1;
        var currentUser = new User { Id = 1, Username = "testuser", Email = "testuser@example.com" };
        var article = new Article { Id = articleId, Author = new User { Id = 2, Username = "anotheruser", Email = "anotheruser@example.com" } };
        _sessionServiceMock.Setup(s => s.GetCurrentUser(null)).Returns(currentUser);
        _articleServiceMock.Setup(a => a.GetSpecificArticle(articleId)).Returns(article);

        // Act
        var result = _articleController.MarkAllCommentsAsViewed(articleId);

        // Assert
        Assert.IsInstanceOfType(result, typeof(UnauthorizedObjectResult));
    }

    [TestMethod]
    public void MarkAllCommentsAsViewed_ValidArticleId_ReturnsNoContentResult()
    {
        // Arrange
        var articleId = 1;
        var currentUser = new User { Id = 1, Username = "testuser", Email = "testuser@example.com" };
        var article = new Article { Id = articleId, Author = currentUser };
        _sessionServiceMock.Setup(s => s.GetCurrentUser(null)).Returns(currentUser);
        _articleServiceMock.Setup(a => a.GetSpecificArticle(It.IsAny<Int32>())).Returns(article);
        _commentServiceMock.Setup(c => c.MarkAllArticleCommentsAsViewed(articleId));

        // Act
        var result = _articleController.MarkAllCommentsAsViewed(articleId);

        // Assert
        Assert.IsInstanceOfType(result, typeof(NoContentResult));
    }

    [TestMethod]
    public void MarkAllCommentsAsViewed_NonexistentArticleId_ReturnsNotFoundResult()
    {
        // Arrange
        var articleId = 1;
        var currentUser = new User { Id = 1, Username = "testuser", Email = "testuser@example.com" };
        _sessionServiceMock.Setup(s => s.GetCurrentUser(null)).Returns(currentUser);
        _articleServiceMock.Setup(a => a.GetSpecificArticle(articleId)).Throws(new ResourceNotFoundException("Article not found"));

        // Act
        var result = _articleController.MarkAllCommentsAsViewed(articleId);

        // Assert
        Assert.IsInstanceOfType(result, typeof(NotFoundObjectResult));
    }


     [TestMethod]
    public void CreateArticle_ValidArticle_ReturnsCreatedAtRouteResult()
    {
        // Arrange
        var author = new User { Id = 1, Username = "testuser", Email = "testuser@example.com" };
        var newArticle = new ArticleModel { Title = "Test Article", Content = "This is a test article." };
        var createdArticle = new Article { Id = 1, Title = newArticle.Title, Content = newArticle.Content, Author = author };
        _sessionServiceMock.Setup(s => s.GetCurrentUser(null)).Returns(author);
        _articleServiceMock.Setup(a => a.CreateArticle(It.IsAny<Article>())).Returns(createdArticle);

        // Act
        var result = _articleController.CreateArticle(newArticle) as CreatedAtRouteResult;

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual("GetArticle", result.RouteName);
        Assert.AreEqual(createdArticle.Id, result.RouteValues["articleId"]);
        Assert.IsInstanceOfType(result.Value, typeof(ArticleDetailModel));
        var articleModel = result.Value as ArticleDetailModel;
        Assert.AreEqual(createdArticle.Id, articleModel.Id);
        Assert.AreEqual(createdArticle.Title, articleModel.Title);
        Assert.AreEqual(createdArticle.Content, articleModel.Content);
        Assert.AreEqual(createdArticle.Author.Id, articleModel.AuthorId);
    }

    [TestMethod]
    public void CreateArticle_InvalidArticle_ReturnsBadRequestResult()
    {
        // Arrange
        var author = new User { Id = 1, Username = "testuser", Email = "testuser@example.com" };
        var newArticle = new ArticleModel { Title = "", Content = "" };
        _sessionServiceMock.Setup(s => s.GetCurrentUser(null)).Returns(author);
        _articleServiceMock.Setup(a => a.CreateArticle(It.IsAny<Article>())).Throws(new InvalidResourceException("Invalid article"));

        // Act
        var result = _articleController.CreateArticle(newArticle) as BadRequestObjectResult;

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual("Invalid article", result.Value);
    }

    [TestMethod]
    public void CreateArticle_CurrentUserNotFound_ReturnsNotFoundResult()
    {
        // Arrange
        _articleServiceMock.Setup(a => a.CreateArticle(It.IsAny<Article>())).Returns(new Article());
        _sessionServiceMock.Setup(s => s.GetCurrentUser(null)).Returns<User>(null);

        // Act
        var result = _articleController.CreateArticle(new ArticleModel()) as NotFoundObjectResult;

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual("Cant retrieve user without auth token", result.Value);
    }



    [TestMethod]
    public void GetArticles_ReturnsOkResult()
    {
        // Arrange
        var searchCriteria = new ArticleSearchCriteria();
        var currentUser = new User { Id = 1, Username = "testuser", Email = "testuser@example.com" };
        var article1 = new Article { Id = 1, Title = "Article 1", Private = false, Author = currentUser };
        var article2 = new Article { Id = 2, Title = "Article 2", Private = true, Author = currentUser };
        var article3 = new Article { Id = 3, Title = "Article 3", Private = true, Author = new User { Id = 2, Username = "otheruser", Email = "otheruser@example.com" } };
        var articles = new List<Article> { article1, article2, article3 };
        _sessionServiceMock.Setup(s => s.GetCurrentUser(null)).Returns(currentUser);
        _articleServiceMock.Setup(a => a.GetAllArticles(searchCriteria, null, null, null)).Returns(articles);

        // Act
        var result = _articleController.GetArticles(searchCriteria, null, null, null) as OkObjectResult;

        // Assert
        Assert.IsNotNull(result);
        Assert.IsInstanceOfType(result.Value, typeof(IEnumerable<ArticleDetailModel>));
        var resultList = result.Value as IEnumerable<ArticleDetailModel>;
        Assert.AreEqual(2, resultList.Count());
        Assert.AreEqual(article1.Title, resultList.First().Title);
        Assert.AreEqual(article2.Title, resultList.Last().Title);
    }

    [TestMethod]
    public void GetArticles_WithResourceNotFoundException_ReturnsNotFoundResult()
    {
        // Arrange
        var searchCriteria = new ArticleSearchCriteria();
        _sessionServiceMock.Setup(s => s.GetCurrentUser(null)).Returns(new User { Id = 1, Username = "testuser", Email = "testuser@example.com" });
        _articleServiceMock.Setup(a => a.GetAllArticles(searchCriteria, null, null, null)).Throws(new ResourceNotFoundException("Not found"));

        // Act
        var result = _articleController.GetArticles(searchCriteria, null, null, null) as NotFoundObjectResult;

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual("Not found", result.Value);
    }

    [TestMethod]
    public void GetArticles_WithInvalidResourceException_ReturnsBadRequestResult()
    {
        // Arrange
        var searchCriteria = new ArticleSearchCriteria();
        _sessionServiceMock.Setup(s => s.GetCurrentUser(null)).Returns(new User { Id = 1, Username = "testuser", Email = "testuser@example.com" });
        _articleServiceMock.Setup(a => a.GetAllArticles(searchCriteria, null, null, null)).Throws(new InvalidResourceException("Invalid resource"));

        // Act
        var result = _articleController.GetArticles(searchCriteria, null, null, null) as BadRequestObjectResult;

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual("Invalid resource", result.Value);
    }


    [TestMethod]
    public void DeleteArticle_ValidArticleId_ReturnsNoContentResult()
    {
        // Arrange
        var articleId = 1;
        var currentUser = new User { Id = 1, Username = "testuser", Email = "testuser@example.com" };
        var article = new Article { Id = articleId, Author = currentUser };
        _sessionServiceMock.Setup(s => s.GetCurrentUser(null)).Returns(currentUser);
        _articleServiceMock.Setup(a => a.GetSpecificArticle(It.IsAny<Int32>())).Returns(article);

        // Act
        var result = _articleController.DeleteArticle(articleId);

        // Assert
        Assert.IsInstanceOfType(result, typeof(NoContentResult));
        _articleServiceMock.Verify(a => a.DeleteArticle(articleId), Times.Once);
    }


    [TestMethod]
    public void DeleteArticle_ArticleNotFound_ReturnsNotFoundResult()
    {
        // Arrange
        var articleId = 1;
        _articleServiceMock.Setup(a => a.GetSpecificArticle(It.IsAny<Int32>())).Throws(new ResourceNotFoundException("Not found"));

        // Act
        var result = _articleController.DeleteArticle(articleId);

        // Assert
        Assert.IsInstanceOfType(result, typeof(NotFoundObjectResult));
    }

    [TestMethod]
    public void DeleteArticle_UserNotAuthorized_ReturnsUnauthorizedResult()
    {
        // Arrange
        var articleId = 1;
        var currentUser = new User { Id = 1, Username = "testuser", Email = "testuser@example.com" };
        var article = new Article { Id = articleId, Author = new User { Id = 2, Username = "otheruser", Email = "otheruser@example.com" } };
        _sessionServiceMock.Setup(s => s.GetCurrentUser(null)).Returns(currentUser);
        _articleServiceMock.Setup(a => a.GetSpecificArticle(It.IsAny<Int32>())).Returns(article);

        // Act
        var result = _articleController.DeleteArticle(articleId);

        // Assert
        Assert.IsInstanceOfType(result, typeof(UnauthorizedObjectResult));
    }
}


