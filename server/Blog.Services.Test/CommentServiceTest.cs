using System.Linq.Expressions;
using Blog.Domain;
using Blog.Domain.Exceptions;
using Blog.Domain.SearchCriterias;
using Blog.IDataAccess;
using Blog.IServices;
using Moq;

namespace Blog.Services.Test;

[TestClass]
public class CommentServiceTest
{
    private Mock<ICommentRepository> _repoMock;
    private ICommentService _commentService;

    [TestInitialize]
    public void Setup()
    {
        _repoMock = new Mock<ICommentRepository>();
        _commentService = new CommentService(_repoMock.Object);
    }

    [TestCleanup]
    public void Cleanup()
    {
        _repoMock.VerifyAll();
    }

    [TestMethod]
    public void CreateComment_InsertsAndSavesNewComment()
    {
        // Arrange
        var comment = new Comment { Id = 1, Content = "Test content", Author = new User(), Article = new Article(), IsViewed  = false };

        // Act
        _commentService.CreateComment(comment);

        // Assert
        _repoMock.Verify(repo => repo.Insert(comment), Times.Once);
        _repoMock.Verify(repo => repo.Save(), Times.Once);
    }

    [TestMethod]
    public void GetSpecificComment_ReturnsExistingComment()
    {
        // Arrange
        var comment = new Comment { Id = 1, Content = "Test content", Author = new User(), Article = new Article(), IsViewed = false };
        _repoMock.Setup(repo => repo.GetOneBy(It.IsAny<Expression<Func<Comment, bool>>>())).Returns(comment);

        // Act
        var result = _commentService.GetSpecificComment(comment.Id);

        // Assert
        Assert.AreEqual(comment, result);
    }

    [TestMethod]
    [ExpectedException(typeof(ResourceNotFoundException))]
    public void GetSpecificComment_ThrowsResourceNotFoundExceptionWhenCommentNotFound()
    {
        // Arrange
        _repoMock.Setup(repo => repo.GetOneBy(It.IsAny<Expression<Func<Comment, bool>>>())).Returns((Comment)null);

        // Act
        _commentService.GetSpecificComment(1);
    }

    [TestMethod]
    public void UpdateComment_UpdatesCommentAttributesAndSaves()
    {
        // Arrange
        var existingComment = new Comment { Id = 1, Author = new User { Id = 1 }, Content = "Original comment", Article = new Article { Id = 1 } };
        var updatedComment = new Comment { Id = 1, Author = new User { Id = 1 }, Content = "Updated comment", Article = new Article { Id = 1 } };

        _repoMock.Setup(repo => repo.GetOneBy(It.IsAny<Expression<Func<Comment, bool>>>())).Returns(existingComment);

        // Act
        var result = _commentService.UpdateComment(existingComment.Id, updatedComment);

        // Assert
        Assert.AreEqual(updatedComment.Content, result.Content);
        _repoMock.Verify(repo => repo.Update(It.Is<Comment>(c => c.Content == updatedComment.Content)), Times.Once);
        _repoMock.Verify(repo => repo.Save(), Times.Once);
    }


    [TestMethod]
    public void GetAllComments_ReturnsListOfComments_WhenCalled()
    {
        // Arrange
        var comments = new List<Comment>()
        {
            new Comment { Id = 1, Content = "This is the first comment" },
            new Comment { Id = 2, Content = "This is the second comment" },
            new Comment { Id = 3, Content = "This is the third comment" }
        };
        var searchCriteria = new CommentSearchCriteria();

        _repoMock.Setup(repo => repo.GetAllBy(It.IsAny<Expression<Func<Comment, bool>>>())).Returns(comments);

        // Act
        var result = _commentService.GetAllComments(searchCriteria);

        // Assert
        Assert.IsNotNull(result);
        Assert.IsInstanceOfType(result, typeof(List<Comment>));
        Assert.AreEqual(comments.Count, result.Count);
        Assert.AreEqual(comments[0].Id, result[0].Id);
        Assert.AreEqual(comments[1].Id, result[1].Id);
        Assert.AreEqual(comments[2].Id, result[2].Id);
    }

    [TestMethod]
    public void GetAllComments_ReturnsEmptyList_WhenNoCommentsFound()
    {
        // Arrange
        var searchCriteria = new CommentSearchCriteria();

        _repoMock.Setup(repo => repo.GetAllBy(It.IsAny<Expression<Func<Comment, bool>>>())).Returns(new List<Comment>());

        // Act
        var result = _commentService.GetAllComments(searchCriteria);

        // Assert
        Assert.IsNotNull(result);
        Assert.IsInstanceOfType(result, typeof(List<Comment>));
        Assert.AreEqual(0, result.Count);
    }





    [TestMethod]
    public void MarkAllArticleCommentsAsViewed_MarksAllArticleCommentsAsViewed_WhenCalled()
    {
        // Arrange
        var articleId = 1;

        _repoMock.Setup(repo => repo.MarkAllArticleCommentsAsViewed(articleId)).Verifiable();

        // Act
        _commentService.MarkAllArticleCommentsAsViewed(articleId);

        // Assert
        _repoMock.Verify(repo => repo.MarkAllArticleCommentsAsViewed(articleId), Times.Once);
    }

}
