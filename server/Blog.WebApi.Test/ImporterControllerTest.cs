namespace Blog.WebApi.Tests;

using Blog.IServices;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Blog.Domain;
using Blog.WebApi.Controllers;
using Models.In;
using Blog.Domain.Exceptions;
using Blog.Domain.SearchCriterias;
using Models;
using System;

[TestClass]
public class ImporterControllerTest
{
    private Mock<IArticleService> _articleServiceMock;
    private Mock<IUserService> _userServiceMock;
    private Mock<IImporterService> _importerServiceMock;

    [TestInitialize]
    public void Setup()
    {
        _articleServiceMock = new Mock<IArticleService>(MockBehavior.Strict);
        _userServiceMock = new Mock<IUserService>(MockBehavior.Strict);
        _importerServiceMock = new Mock<IImporterService>(MockBehavior.Strict);
    }

    [TestCleanup]
    public void Cleanup()
    {
        _articleServiceMock.VerifyAll();
        _userServiceMock.VerifyAll();
        _importerServiceMock.VerifyAll();
    }

    [TestMethod]
    public void GetImporters_ReturnsOkResultWithData()
    {
        // Arrange
        List<string> importers = new List<string> { "Importer1", "Importer2" };
        _importerServiceMock.Setup(m => m.GetAllImporters()).Returns(importers);

        var controller = new ImporterController(_importerServiceMock.Object, _articleServiceMock.Object, _userServiceMock.Object);

        // Act
        IActionResult result = controller.GetImporters();

        // Assert
        Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        OkObjectResult okResult = (OkObjectResult)result;
        List<string> retrievedImporters = (List<string>)okResult.Value;
        CollectionAssert.AreEqual(importers, retrievedImporters);
    }

    [TestMethod]
    public void ImportArticles_ReturnsOkResultWithArticleDetailModels()
    {
        // Arrange
        ImporterModel importerModel = new ImporterModel
        {
            ImporterName = "Importer1",
            FilePath = "path/to/file"
        };
        List<Article> importedArticles = new List<Article>
        {
            new Article { Id = 1, Title = "Article1", Content = "Content1", Author = CreateUser(1) },
            new Article { Id = 2, Title = "Article2", Content = "Content2", Author = CreateUser(2) }
        };
        List<ArticleDetailModel> expectedArticleDetailModels = importedArticles
            .Select(a => new ArticleDetailModel(a))
            .ToList();

        _importerServiceMock.Setup(m => m.ImportArticles(importerModel.ImporterName, importerModel.FilePath))
            .Returns(importedArticles);

        _userServiceMock.Setup(m => m.GetSpecificUser(It.IsAny<int>()))
            .Returns((int userId) => new User { Id = userId, Username = "Author" + userId });

        _articleServiceMock.Setup(m => m.CreateArticle(It.IsAny<Article>()))
            .Returns((Article article) => new Article { Id = article.Id, Title = article.Title, Content = article.Content });

        var controller = new ImporterController(_importerServiceMock.Object, _articleServiceMock.Object, _userServiceMock.Object);

        // Act
        IActionResult result = controller.ImportArticles(importerModel);

        // Assert
        Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        OkObjectResult okResult = (OkObjectResult)result;
    }

    private User CreateUser(int userId)
    {
        return new User()
        {
            Id = userId,
            FirstName = "Firstname",
            LastName = "Lastname",
            Password = "Password",
            Email = "email@gmail.com",
            Username = "username"
        };
    }

}
