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

[TestClass]
public class ArticleControllerTest
{
    private Mock<IArticleService> _articleServiceMock;
    private Mock<ICommentService> _commentServiceMock;
    
    [TestInitialize]
    public void Setup()
    {
        _articleServiceMock = new Mock<IArticleService>(MockBehavior.Strict);
        _commentServiceMock = new Mock<ICommentService>(MockBehavior.Strict);
    }

    [TestCleanup]
    public void Cleanup()
    {
        _articleServiceMock.VerifyAll();
        _commentServiceMock.VerifyAll();
    }

    [TestMethod]
    public async Task GetExistingArticleReturnsAsExpected()
    {
        var article = CreateArticle(1);
        var expectedArticle = new ArticleModel(article);
        _articleServiceMock.Setup(service => service.GetByIdAsync(It.IsAny<int>())).ReturnsAsync(article);
        var controller = new ArticleController(_articleServiceMock.Object, _commentServiceMock.Object);
        
        var response = await controller.GetById(article.Id) as OkObjectResult;

        
        Assert.AreEqual((int)HttpStatusCode.OK, response.StatusCode);
        Assert.AreEqual(expectedArticle, response.Value);
    }

    [TestMethod]
    public async Task GetNonExistingArticleReturnsNotFound()
    {
        var exception = new ResourceNotFoundException("Could not find this article, sorry :)");
        _articleServiceMock.Setup(service => service.GetByIdAsync(It.IsAny<int>()))
            .Throws(exception);
        var controller = new ArticleController(_articleServiceMock.Object, _commentServiceMock.Object);

        var response = await controller.GetById(1) as ObjectResult;

        Assert.AreEqual((int)HttpStatusCode.NotFound, response.StatusCode);
        Assert.AreEqual(exception.Message, response.Value);
    }

    [TestMethod]
    public async Task GetAllArticlesReturnsAsExpected()
    {
        var articles = new List<Article>
        {
            CreateArticle(1),
            CreateArticle(2)
        };
        _articleServiceMock.Setup(service => service.GetAllAsync()).ReturnsAsync(articles);
        
        var controller = new ArticleController(_articleServiceMock.Object, _commentServiceMock.Object);

        var result = await controller.GetAll() as OkObjectResult;

        var articlesResult = result.Value as IEnumerable<ArticleModel>;

        Assert.IsNotNull(articlesResult);
        Assert.AreEqual(articles.Count, articlesResult.Count());
    }

    [TestMethod]
    public async Task CreateNewArticleReturnCreatedAtRoutedWithCreatedArticleAsExpected()
    {
        var article = CreateArticle(1);

        _articleServiceMock.Setup(service => service.AddAsync(It.IsAny<Article>())).ReturnsAsync(article);

        var controller = new ArticleController(_articleServiceMock.Object, _commentServiceMock.Object);

        var newArticle = new ArticleModel(article);

        var result = await controller.Add(newArticle);

        var createdResult = result as CreatedAtRouteResult;

        Assert.AreEqual("GetById", createdResult.RouteName);
        Assert.AreEqual(newArticle.Id, createdResult.RouteValues["articleId"]);

        var articleResult = createdResult.Value as ArticleModel;
        Assert.AreEqual(newArticle.Id, articleResult.Id);
        Assert.AreEqual(newArticle.Title, articleResult.Title);
        Assert.AreEqual(newArticle.Content, articleResult.Content);
    }

    [TestMethod]
    public async Task UpdateAnArticleReturnUpdatedArticleAsExpected()
    {
        var article = CreateArticle(1);

        _articleServiceMock.Setup(service => service.UpdateAsync(It.IsAny<int>(),  It.IsAny<Article>())).ReturnsAsync(article);

        var controller = new ArticleController(_articleServiceMock.Object, _commentServiceMock.Object);

        var updatedArticle = new ArticleModel(article);

        var result = await controller.Update(article.Id, updatedArticle) as OkObjectResult; ;

        Assert.AreEqual((int)HttpStatusCode.OK, result.StatusCode);
        Assert.AreEqual(updatedArticle, result.Value);
    }

    [TestMethod]
    public async Task DeleteAnArticleReturnNoContent()
    {
        var article = CreateArticle(1);

        _articleServiceMock.Setup(service => service.DeleteAsync(It.IsAny<int>())).ReturnsAsync(true);

        var controller = new ArticleController(_articleServiceMock.Object, _commentServiceMock.Object);

        var result = await controller.Delete(article.Id) as NoContentResult;

        Assert.IsNotNull(result);

        _articleServiceMock.Verify(s => s.DeleteAsync(article.Id), Times.Once);
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