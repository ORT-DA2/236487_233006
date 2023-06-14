namespace Blog.WebApi.Tests;

using Blog.IServices;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Blog.Domain;
using Blog.WebApi.Controllers;
using Blog.Domain.Exceptions;
using Blog.Domain.SearchCriterias;
using Models;

[TestClass]
public class OffensiveWordControllerTest
{
    private Mock<IOffensiveWordService> _offensiveWordServiceMock;

    [TestInitialize]
    public void Setup()
    {
        _offensiveWordServiceMock = new Mock<IOffensiveWordService>(MockBehavior.Strict);
    }

    [TestCleanup]
    public void Cleanup()
    {
        _offensiveWordServiceMock.VerifyAll();
    }

    [TestMethod]
    public void GetOffensiveWords_ValidCriteria_ReturnsOkResult()
    {
        var searchCriteria = new OffensiveWordSearchCriteria();
        var offensiveWords = new List<OffensiveWord>() { new OffensiveWord(), new OffensiveWord() };
        _offensiveWordServiceMock.Setup(x => x.GetAllOffensiveWords(searchCriteria)).Returns(offensiveWords);

        var controller = new OffensiveWordController(_offensiveWordServiceMock.Object);

        var result = controller.GetOffensiveWords(searchCriteria);

        Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        var okResult = result as OkObjectResult;
        var words = okResult.Value as IEnumerable<OffensiveWordDetailModel>;
        Assert.IsNotNull(words);
        Assert.AreEqual(offensiveWords.Count, words.Count());
    }

    [TestMethod]
    public void GetCommentReturnsOkResultWhenCommentExists()
    {
        OffensiveWord word = new OffensiveWord()
        {
            Id = 1,
            Word = "Test"
        };
        _offensiveWordServiceMock.Setup(s => s.GetSpecificOffensiveWord(It.IsAny<int>()))
            .Returns(word);
        var controller = new OffensiveWordController(_offensiveWordServiceMock.Object);

        var result = controller.GetOffensiveWord(word.Id);

        Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        Assert.AreEqual(1, word.Id);
        Assert.AreEqual("Test", word.Word);
    }

    [TestMethod]
    public void GetCommentReturnsNotFoundResultWhenCommentDoesNotExist()
    {
        _offensiveWordServiceMock.Setup(s => s.GetSpecificOffensiveWord(It.IsAny<int>())).Throws(new ResourceNotFoundException("Offensive word not found"));
        var controller = new OffensiveWordController(_offensiveWordServiceMock.Object);

        var result = controller.GetOffensiveWord(1) as NotFoundObjectResult;

        Assert.IsNotNull(result);
        Assert.AreEqual("Offensive word not found", result.Value);
    }


    [TestMethod]
    public void CreateOffensiveWordShouldReturnCreatedAtRoute()
    {
        OffensiveWord word = new OffensiveWord()
        {
            Id = 1,
            Word = "Test"
        };

        _offensiveWordServiceMock.Setup(ow => ow.CreateOffensiveWord(It.IsAny<OffensiveWord>())).Returns(word);

        var controller = new OffensiveWordController(_offensiveWordServiceMock.Object);

        var result = controller.CreateOffensiveWord(word) as CreatedAtRouteResult;

        Assert.IsNotNull(result);
        Assert.AreEqual("GetOffensiveWord", result.RouteName);
        Assert.AreEqual(word.Id, result.RouteValues["offensiveWordId"]);
    }
}
