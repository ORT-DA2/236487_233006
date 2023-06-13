using Blog.DataAccess.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Blog.DataAccess.Test;

using Blog.DataAccess;
using Blog.Domain;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;
using System.Collections.Generic;

[TestClass]
public class OffensiveWordRepositoryTest
{
    private readonly OffensiveWordRepository _repository;
    private readonly BlogContext _blogContext;

    public OffensiveWordRepositoryTest()
    {
        _blogContext = ContextFactory.GetNewContext(ContextType.SQLite);
        _repository = new OffensiveWordRepository(_blogContext);
    }

    [TestInitialize]
    public void SetUp()
    {
        _blogContext.Database.OpenConnection();
        _blogContext.Database.EnsureCreated();
    }

    [TestCleanup]
    public void CleanUp()
    {
        _blogContext.Database.EnsureDeleted();
    }

    [TestMethod]
    public void GetAllBy_ShouldReturnCorrectOffensiveWords()
    {
        // Arrange
        var offensiveWords = new List<OffensiveWord>
            {
                new OffensiveWord { Word = "word1" },
                new OffensiveWord { Word = "word2" },
                new OffensiveWord { Word = "word3" }
            };

        _blogContext.OffensiveWords.AddRange(offensiveWords);
        _blogContext.SaveChanges();

        // Act
        var savedOffensiveWords = _repository.GetAllBy(ow => offensiveWords.Select(w => w.Word).Contains(ow.Word)).ToList();

        // Assert
        Assert.AreEqual(offensiveWords.Count, savedOffensiveWords.Count);
    }

    [TestMethod]
    public void GetOneBy_ShouldReturnCorrectOffensiveWord()
    {
        // Arrange
        var offensiveWord = new OffensiveWord { Word = "word1" };

        _blogContext.OffensiveWords.Add(offensiveWord);
        _blogContext.SaveChanges();

        // Act
        var foundOffensiveWord = _repository.GetOneBy(ow => ow.Word == offensiveWord.Word);

        // Assert
        Assert.IsNotNull(foundOffensiveWord);
        Assert.AreEqual(offensiveWord.Id, foundOffensiveWord.Id);
    }

    [TestMethod]
    public void InsertAndSave_NewOffensiveWord_ShouldBeSaved()
    {
        // Arrange
        var newOffensiveWord = new OffensiveWord { Word = "word1" };

        // Act
        _repository.Insert(newOffensiveWord);
        _repository.Save();

        var savedOffensiveWord = _blogContext.OffensiveWords.FirstOrDefault(ow => ow.Word == newOffensiveWord.Word);

        // Assert
        Assert.IsNotNull(savedOffensiveWord);
        Assert.AreEqual(newOffensiveWord.Word, savedOffensiveWord.Word);
    }

    [TestMethod]
    public void UpdateAndSave_ExistingOffensiveWord_ShouldBeUpdated()
    {
        // Arrange
        var offensiveWord = new OffensiveWord { Word = "word1" };
        _blogContext.OffensiveWords.Add(offensiveWord);
        _blogContext.SaveChanges();

        // Act
        offensiveWord.Word = "updatedWord";
        _repository.Update(offensiveWord);
        _repository.Save();

        var updatedOffensiveWord = _blogContext.OffensiveWords.FirstOrDefault(ow => ow.Id == offensiveWord.Id);

        // Assert
        Assert.IsNotNull(updatedOffensiveWord);
        Assert.AreEqual(offensiveWord.Word, updatedOffensiveWord.Word);
    }
}
