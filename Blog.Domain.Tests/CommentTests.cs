using Blog.Domain.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Blog.Domain.Tests;

[TestClass]
public class CommentTests
{
    private User _author;
    private Article _article;
    private Comment _validComment;

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

        _article = new Article() { Title = "A title", Content = "A content", Author = _author };

        _validComment = new Comment() { Content = "A content", Article = _article, Author = _author };
    }

    // Existing tests

    [TestMethod]
    public void ValidOrFailPassesWithValidComment()
    {
        _validComment.ValidOrFail();
    }

    [TestMethod]
    [ExpectedException(typeof(InvalidResourceException))]
    public void ValidOrFailThrowsExceptionWithInvalidArticle()
    {
        var invalidComment = new Comment() { Content = "", Article = _article, Author = _author };
        invalidComment.ValidOrFail();
    }

    // Additional tests

    [TestMethod]
    [ExpectedException(typeof(InvalidResourceException))]
    public void ValidOrFailThrowsExceptionWithNullAuthor()
    {
        var invalidComment = new Comment() { Content = "A content", Article = _article, Author = null };
        invalidComment.ValidOrFail();
    }

    [TestMethod]
    [ExpectedException(typeof(InvalidResourceException))]
    public void ValidOrFailThrowsExceptionWithNullArticle()
    {
        var invalidComment = new Comment() { Content = "A content", Article = null, Author = _author };
        invalidComment.ValidOrFail();
    }

    [TestMethod]
    public void UpdateAttributesUpdatesCommentAttributes()
    {
        var updatedComment = new Comment()
        {
            Author = _author,
            Content = "Updated content",
            Reply = _validComment,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            DeletedAt = null
        };

        _validComment.UpdateAttributes(updatedComment);

        Assert.AreEqual(updatedComment.Author, _validComment.Author);
        Assert.AreEqual(updatedComment.Content, _validComment.Content);
        Assert.AreEqual(updatedComment.Reply, _validComment.Reply);
        Assert.AreEqual(updatedComment.CreatedAt, _validComment.CreatedAt);
        Assert.AreEqual(updatedComment.UpdatedAt, _validComment.UpdatedAt);
        Assert.AreEqual(updatedComment.DeletedAt, _validComment.DeletedAt);
    }
}
