using System.Linq.Expressions;
using Blog.Domain;
using Blog.Domain.Exceptions;
using Blog.Domain.SearchCriterias;
using Blog.IDataAccess;
using Blog.IServices;
using Moq;

namespace Blog.Services.Test;

[TestClass]
public class OffensiveWordServiceTest
{
    private Mock<IRepository<OffensiveWord>> _repoMock;
    private IOffensiveWordService _offensiveWordService;

    [TestInitialize]
    public void Setup()
    {
        _repoMock = new Mock<IRepository<OffensiveWord>>();
        _offensiveWordService = new OffensiveWordService(_repoMock.Object);
    }

    [TestCleanup]
    public void Cleanup()
    {
        _repoMock.VerifyAll();
    }

    [TestMethod]
    public void CreateOffensiveWord_InsertsAndSave()
    {
        var word = new OffensiveWord { Id = 1, Word = "Test" };

        _offensiveWordService.CreateOffensiveWord(word);

        _repoMock.Verify(repo => repo.Insert(word), Times.Once);
        _repoMock.Verify(repo => repo.Save(), Times.Once);
    }

    [TestMethod]
    public void GetSpecificWord_ReturnsExistingWord()
    {
        // Arrange
        var word = new OffensiveWord { Id = 1, Word = "Test" };
        _repoMock.Setup(repo => repo.GetOneBy(It.IsAny<Expression<Func<OffensiveWord, bool>>>())).Returns(word);

        // Act
        var result = _offensiveWordService.GetSpecificOffensiveWord(word.Id);

        // Assert
        Assert.AreEqual(word, result);
    }

    [TestMethod]
    [ExpectedException(typeof(ResourceNotFoundException))]
    public void GetSpecificWord_ThrowsResourceNotFoundExceptionWhenWordNotFound()
    {
        // Arrange
        _repoMock.Setup(repo => repo.GetOneBy(It.IsAny<Expression<Func<OffensiveWord, bool>>>())).Returns((OffensiveWord)null);

        // Act
        _offensiveWordService.GetSpecificOffensiveWord(1);
    }

    [TestMethod]
    public void UpdateWord_UpdatesWordAttributesAndSaves()
    {
        // Arrange
        var existingWord = new OffensiveWord { Id = 1, Word = "Test" };
        var updatedWord = new OffensiveWord { Word = "Test updated" };

        _repoMock.SetupSequence(repo => repo.GetOneBy(It.IsAny<Expression<Func<OffensiveWord, bool>>>()))
            .Returns((OffensiveWord)null)  // First call returns null
            .Returns(existingWord);  // Second call returns existingWord

        // Act
        var result = _offensiveWordService.UpdateOffensiveWord(existingWord.Id, updatedWord);

        // Assert
        Assert.AreEqual(updatedWord.Word, result.Word);
        _repoMock.Verify(repo => repo.Update(It.Is<OffensiveWord>(w => w.Word == updatedWord.Word)), Times.Once);
        _repoMock.Verify(repo => repo.Save(), Times.Once);
    }


    [TestMethod]
    public void GetAllWords_ReturnsListOfWords_WhenCalled()
    {
        // Arrange
        var words = new List<OffensiveWord>()
        {
            new OffensiveWord { Id = 1, Word = "Test 1" },
            new OffensiveWord { Id = 2, Word = "Test 2" },
            new OffensiveWord { Id = 3, Word = "Test 3" }
        };
        var searchCriteria = new OffensiveWordSearchCriteria();

        _repoMock.Setup(repo => repo.GetAllBy(It.IsAny<Expression<Func<OffensiveWord, bool>>>())).Returns(words);

        // Act
        var result = _offensiveWordService.GetAllOffensiveWords(searchCriteria);

        // Assert
        Assert.IsNotNull(result);
        Assert.IsInstanceOfType(result, typeof(List<OffensiveWord>));
        Assert.AreEqual(words.Count, result.Count);
        Assert.AreEqual(words[0].Id, result[0].Id);
        Assert.AreEqual(words[1].Id, result[1].Id);
        Assert.AreEqual(words[2].Id, result[2].Id);
    }

    [TestMethod]
    public void GetAllWords_ReturnsEmptyList_WhenNoWordsFound()
    {
        // Arrange
        var searchCriteria = new OffensiveWordSearchCriteria();

        _repoMock.Setup(repo => repo.GetAllBy(It.IsAny<Expression<Func<OffensiveWord, bool>>>())).Returns(new List<OffensiveWord>());

        // Act
        var result = _offensiveWordService.GetAllOffensiveWords(searchCriteria);

        // Assert
        Assert.IsNotNull(result);
        Assert.IsInstanceOfType(result, typeof(List<OffensiveWord>));
        Assert.AreEqual(0, result.Count);
    }
}
