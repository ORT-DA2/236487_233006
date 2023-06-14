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

    [TestMethod]
    public void UpdateOffensiveWord_ValidIdAndUpdatedWord_ReturnsOk()
    {
        // Arrange
        int offensiveWordId = 1;
        var updatedWord = new OffensiveWord { Id = offensiveWordId, Word = "UpdatedWord" };
        var retrievedWord = new OffensiveWord { Id = offensiveWordId, Word = "OriginalWord" };
        _offensiveWordServiceMock.Setup(s => s.UpdateOffensiveWord(offensiveWordId, updatedWord)).Returns(retrievedWord);

        // Act
        var controller = new OffensiveWordController(_offensiveWordServiceMock.Object);
        var result = controller.UpdateOffensiveWord(offensiveWordId, updatedWord) as OkObjectResult;

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(200, result.StatusCode);
        Assert.IsInstanceOfType(result.Value, typeof(OffensiveWordDetailModel));
        var offensiveWordModel = result.Value as OffensiveWordDetailModel;
        Assert.AreEqual(retrievedWord.Id, offensiveWordModel.Id);
        Assert.AreEqual(retrievedWord.Word, offensiveWordModel.Word);
    }

    [TestMethod]
    public void UpdateOffensiveWord_InvalidId_ReturnsNotFound()
    {
        // Arrange
        int offensiveWordId = 1;
        var updatedWord = new OffensiveWord { Id = offensiveWordId, Word = "UpdatedWord" };
        _offensiveWordServiceMock.Setup(s => s.UpdateOffensiveWord(offensiveWordId, updatedWord)).Throws(new ResourceNotFoundException("Word not found"));

        // Act
        var controller = new OffensiveWordController(_offensiveWordServiceMock.Object);
        var result = controller.UpdateOffensiveWord(offensiveWordId, updatedWord) as NotFoundObjectResult;

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(404, result.StatusCode);
        Assert.AreEqual("Word not found", result.Value);
    }

    [TestMethod]
    public void UpdateOffensiveWord_InvalidResource_ReturnsBadRequest()
    {
        // Arrange
        int offensiveWordId = 1;
        var updatedWord = new OffensiveWord { Id = offensiveWordId, Word = "UpdatedWord" };
        _offensiveWordServiceMock.Setup(s => s.UpdateOffensiveWord(offensiveWordId, updatedWord)).Throws(new InvalidResourceException("Invalid word"));

        // Act
        var controller = new OffensiveWordController(_offensiveWordServiceMock.Object);
        var result = controller.UpdateOffensiveWord(offensiveWordId, updatedWord) as BadRequestObjectResult;

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(400, result.StatusCode);
        Assert.AreEqual("Invalid word", result.Value);
    }

    [TestMethod]
    public void DeleteOffensiveWord_ValidId_ReturnsNoContent()
    {
        // Arrange
        int offensiveWordId = 1;
        _offensiveWordServiceMock.Setup(s => s.GetSpecificOffensiveWord(offensiveWordId)).Returns(new OffensiveWord { Id = offensiveWordId });
        _offensiveWordServiceMock.Setup(s => s.DeleteOffensiveWord(offensiveWordId));

        // Act
        var controller = new OffensiveWordController(_offensiveWordServiceMock.Object);
        var result = controller.DeleteOffensiveWord(offensiveWordId) as NoContentResult;

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(204, result.StatusCode);
    }

    [TestMethod]
    public void DeleteOffensiveWord_InvalidId_ReturnsNotFound()
    {
        // Arrange
        int offensiveWordId = 1;
        _offensiveWordServiceMock.Setup(s => s.GetSpecificOffensiveWord(offensiveWordId)).Throws(new ResourceNotFoundException("Word not found"));

        // Act
        var controller = new OffensiveWordController(_offensiveWordServiceMock.Object);
        var result = controller.DeleteOffensiveWord(offensiveWordId) as NotFoundObjectResult;

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(404, result.StatusCode);
        Assert.AreEqual("Word not found", result.Value);
    }
}
