using Blog.Domain.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace Blog.Domain.Tests;

[TestClass]
public class ArticleTests
{
    private User _author;
    private Article _validArticle;

    [TestInitialize]
    public void Initialize()
    {
        _author = new User
        {
            FirstName = "FirstName",
            LastName = "LastName",
            Username = "username",
            Email = "email@example.com",
            Password = "password1234"
        };

        _validArticle = new Article()
        {
            Title = "A title",
            Content = "A content",
            Author = _author
        };
    }

    // Existing tests

    [TestMethod]
    public void ValidOrFailPassesWithValidArticle()
    {
        _validArticle.ValidOrFail();
    }

    [TestMethod]
    [ExpectedException(typeof(InvalidResourceException))]
    public void ValidOrFailThrowsExceptionWithInvalidArticle()
    {
        var invalidArticle = new Article() { Title = "", Content = "A content", Author = _author };
        invalidArticle.ValidOrFail();
    }

    // Additional tests

    [TestMethod]
    [ExpectedException(typeof(InvalidResourceException))]
    public void ValidOrFailThrowsExceptionWithEmptyContent()
    {
        var invalidArticle = new Article() { Title = "A title", Content = "", Author = _author };
        invalidArticle.ValidOrFail();
    }

    [TestMethod]
    [ExpectedException(typeof(InvalidResourceException))]
    public void ValidOrFailThrowsExceptionWithNullAuthor()
    {
        var invalidArticle = new Article() { Title = "A title", Content = "A content", Author = null };
        invalidArticle.ValidOrFail();
    }

    [TestMethod]
    public void UpdateAttributesUpdatesArticleAttributes()
    {
        var updatedArticle = new Article()
        {
            Title = "Updated title",
            Content = "Updated content",
            Author = _author,
            Private = true,
            Image = "new_image.png",
            Template = Template.Right,
            UpdatedAt = DateTime.UtcNow,
            DeletedAt = null
        };

        _validArticle.UpdateAttributes(updatedArticle);

        Assert.AreEqual(updatedArticle.Title, _validArticle.Title);
        Assert.AreEqual(updatedArticle.Content, _validArticle.Content);
        Assert.AreEqual(updatedArticle.Private, _validArticle.Private);
        Assert.AreEqual(updatedArticle.Image, _validArticle.Image);
        Assert.AreEqual(updatedArticle.Template, _validArticle.Template);
        Assert.AreEqual(updatedArticle.UpdatedAt, _validArticle.UpdatedAt);
        Assert.AreEqual(updatedArticle.DeletedAt, _validArticle.DeletedAt);
    }
}
