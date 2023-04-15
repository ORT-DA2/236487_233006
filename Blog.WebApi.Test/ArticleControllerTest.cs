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
    
    [TestInitialize]
    public void Setup()
    {
        _articleServiceMock = new Mock<IArticleService>(MockBehavior.Strict);
    }

    [TestCleanup]
    public void Cleanup()
    {
        _articleServiceMock.VerifyAll();
    }

    [TestMethod]
    public void GetExistingArticleReturnsAsExpected()
    {
        var article = CreateArticle(1);
        var expectedArticle = new ArticleModel(article);
        _articleServiceMock.Setup(service => service.GetSpecificArticle(It.IsAny<int>())).Returns(article);
        var controller = new ArticleController(_articleServiceMock.Object);

        var response = controller.GetArticle(article.Id) as OkObjectResult;

        Assert.AreEqual((int)HttpStatusCode.OK, response.StatusCode);
        Assert.AreEqual(expectedArticle, response.Value);
    }

    [TestMethod]
    public void GetNonExistingArticleReturnsNotFound()
    {
        var exception = new ResourceNotFoundException("Could not find this article, sorry :)");
        _articleServiceMock.Setup(service => service.GetSpecificArticle(It.IsAny<int>()))
            .Throws(exception);
        var controller = new ArticleController(_articleServiceMock.Object);

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
        
        var controller = new ArticleController(_articleServiceMock.Object);

        var result = controller.GetArticles(criteria) as OkObjectResult;

        var articlesResult = result.Value as IEnumerable<ArticleModel>;

        Assert.IsNotNull(articlesResult);
        Assert.AreEqual(articles.Count, articlesResult.Count());
    }

    [TestMethod]
    public void CreateNewArticleReturnCreatedAtRoutedWithCreatedArticleAsExpected()
    {
        var article = CreateArticle(1);

        _articleServiceMock.Setup(service => service.CreateArticle(It.IsAny<Article>())).Returns(article);

        var controller = new ArticleController(_articleServiceMock.Object);

        var newArticle = new ArticleModel(article);

        var result = controller.CreateArticle(newArticle);

        var createdResult = result as CreatedAtRouteResult;

        Assert.AreEqual("GetArticle", createdResult.RouteName);
        Assert.AreEqual(newArticle.Id, createdResult.RouteValues["articleId"]);

        var articleResult = createdResult.Value as ArticleModel;
        Assert.AreEqual(newArticle.Id, articleResult.Id);
        Assert.AreEqual(newArticle.Title, articleResult.Title);
        Assert.AreEqual(newArticle.Content, articleResult.Content);
    }

    [TestMethod]
    public void UpdateAnArticleReturnUpdatedArticleAsExpected()
    {
        var article = CreateArticle(1);

        _articleServiceMock.Setup(service => service.UpdateArticle(It.IsAny<int>(),  It.IsAny<Article>())).Returns(article);

        var controller = new ArticleController(_articleServiceMock.Object);

        var updatedArticle = new ArticleModel(article);

        var result = controller.UpdateArticle(article.Id, updatedArticle) as OkObjectResult; ;

        Assert.AreEqual((int)HttpStatusCode.OK, result.StatusCode);
        Assert.AreEqual(updatedArticle, result.Value);
    }

    [TestMethod]
    public void DeleteAnArticleReturnNoContent()
    {
        var article = CreateArticle(1);

        var controller = new ArticleController(_articleServiceMock.Object);

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
            Type = "private",
            Template = Template.Left,
            CreatedAt = DateTime.Now,
        };
    }
}