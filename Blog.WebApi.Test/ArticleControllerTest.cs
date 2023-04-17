namespace Blog.WebApi.Tests;

using Blog.IServices;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Blog.Domain;
using Blog.WebApi.Controllers;
using Models;
using System.Net;
using Blog.Services.Exceptions;
using System.Collections.Generic;
using Blog.Domain.SearchCriterias;

[TestClass]
public class ArticleControllerTest
{
    private Mock<IArticleService> _articleServiceMock;
    private Mock<IUserService> _userServiceMock;

    [TestInitialize]
    public void Setup()
    {
        _articleServiceMock = new Mock<IArticleService>(MockBehavior.Strict);
        _userServiceMock = new Mock<IUserService>(MockBehavior.Strict);
    }

    [TestCleanup]
    public void Cleanup()
    {
        _articleServiceMock.VerifyAll();
        _userServiceMock.VerifyAll();
    }

    [TestMethod]
    public void GetExistingArticleReturnsAsExpected()
    {
        var article = CreateArticle(1);
        _articleServiceMock.Setup(service => service.GetSpecificArticle(It.IsAny<int>())).Returns(article);
        var controller = new ArticleController(_articleServiceMock.Object, _userServiceMock.Object);

        var response = controller.GetArticle(article.Id) as OkObjectResult;

        ArticleDetailModel expected = new ArticleDetailModel(article);

        Assert.AreEqual((int)HttpStatusCode.OK, response.StatusCode);
        Assert.AreEqual(expected, response.Value);
    }

    [TestMethod]
    public void GetNonExistingArticleReturnsNotFound()
    {
        var exception = new ResourceNotFoundException("Could not find this article, sorry :)");
        _articleServiceMock.Setup(service => service.GetSpecificArticle(It.IsAny<int>()))
            .Throws(exception);
        var controller = new ArticleController(_articleServiceMock.Object, _userServiceMock.Object);

        var response = controller.GetArticle(1) as ObjectResult;

        Assert.AreEqual((int)HttpStatusCode.NotFound, response.StatusCode);
        Assert.AreEqual(exception.Message, response.Value);
    }

    [TestMethod]
    public void GetAllArticlesReturnsAsExpected()
    {
        var articles = new List<Article>
        {
            CreateArticle(1),
            CreateArticle(2)
        };
        ArticleSearchCriteria criteria = new ArticleSearchCriteria();
        _articleServiceMock.Setup(service => service.GetAllArticles(criteria)).Returns(articles);
        
        var controller = new ArticleController(_articleServiceMock.Object, _userServiceMock.Object);

        var result = controller.GetArticles(criteria) as OkObjectResult;

        var articlesResult = result.Value as IEnumerable<ArticleDetailModel>;

        Assert.IsNotNull(articlesResult);
        Assert.AreEqual(articles.Count, articlesResult.Count());
    }

    [TestMethod]
    public void CreateNewArticleReturnCreatedAtRoutedWithCreatedArticleAsExpected()
    {
        var article = CreateArticle(1);
        var author = CreateAuthor(1);


        _userServiceMock.Setup(service => service.GetSpecificUser(It.IsAny<int>())).Returns(author);
        _articleServiceMock.Setup(service => service.CreateArticle(It.IsAny<Article>())).Returns(article);

        var controller = new ArticleController(_articleServiceMock.Object, _userServiceMock.Object);

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
        var author = CreateAuthor(1);

        _userServiceMock.Setup(service => service.GetSpecificUser(It.IsAny<int>())).Returns(author);
        _articleServiceMock.Setup(service => service.UpdateArticle(It.IsAny<int>(),It.IsAny<Article>())).Returns(article);

        var controller = new ArticleController(_articleServiceMock.Object, _userServiceMock.Object);

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

        _articleServiceMock.Setup(service => service.DeleteArticle(It.IsAny<int>()));

        var controller = new ArticleController(_articleServiceMock.Object, _userServiceMock.Object);

        var result = controller.DeleteArticle(article.Id) as NoContentResult;

        Assert.IsNotNull(result);

        _articleServiceMock.Verify(s => s.DeleteArticle(article.Id), Times.Once);
    }

    private Article CreateArticle(int articleId)
    {
        return new Article()
        {
            Id = articleId,
            Title = "Title",
            Content = "Content",
            Private = false,
            Template = Template.Left,
            CreatedAt = DateTime.Now,
            Author = CreateAuthor(1)
        };
    }

    private User CreateAuthor(int authorId)
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