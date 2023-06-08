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
public class CommentControllerTest
{
    private Mock<IArticleService> _articleServiceMock;
    private Mock<ISessionService> _sessionServiceMock;
    private Mock<ICommentService> _commentServiceMock;
    private Mock<IOffensiveWordService> _offensiveWordServiceMock;

    [TestInitialize]
    public void Setup()
    {
        _articleServiceMock = new Mock<IArticleService>(MockBehavior.Strict);
        _sessionServiceMock = new Mock<ISessionService>(MockBehavior.Strict);
        _commentServiceMock = new Mock<ICommentService>(MockBehavior.Strict);
        _offensiveWordServiceMock = new Mock<IOffensiveWordService>(MockBehavior.Strict);
    }

    [TestCleanup]
    public void Cleanup()
    {
        _articleServiceMock.VerifyAll();
        _sessionServiceMock.VerifyAll();
        _commentServiceMock.VerifyAll();
        _offensiveWordServiceMock.VerifyAll();
    }

    [TestMethod]
    public void GetCommentsShouldReturnOkResult()
    {
        var article = CreateArticle(1);
        var author = CreateUser(1);
        var expectedComments = new List<Comment> { new Comment { Id = 1, Content = "Test Comment", Article = article, Author = author } };
        _commentServiceMock.Setup(c => c.GetAllComments(It.IsAny<CommentSearchCriteria>())).Returns(expectedComments);
        var controller = new CommentController(_articleServiceMock.Object, _commentServiceMock.Object, _sessionServiceMock.Object, _offensiveWordServiceMock.Object);

        var result = controller.GetComments(new CommentSearchCriteria());

        Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        var okResult = result as OkObjectResult;
        var comments = okResult.Value as IEnumerable<CommentDetailModel>;
        Assert.IsNotNull(comments);
        Assert.AreEqual(expectedComments.Count, comments.Count());
    }

    [TestMethod]
    public void GetCommentReturnsOkResultWhenCommentExists()
    {
        var article = CreateArticle(1);
        var author = CreateUser(1);
        int commentId = 1;
        _commentServiceMock.Setup(s => s.GetSpecificComment(It.IsAny<int>()))
            .Returns(new Comment { Id = commentId, Content = "Test comment", Article = article, Author = author });
        var controller = new CommentController(_articleServiceMock.Object, _commentServiceMock.Object, _sessionServiceMock.Object, _offensiveWordServiceMock.Object);

        var result = controller.GetComment(commentId);

        Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        var commentDetail = (CommentDetailModel)((OkObjectResult)result).Value;
        Assert.AreEqual(commentId, commentDetail.Id);
        Assert.AreEqual("Test comment", commentDetail.Content);
    }

    [TestMethod]
    public void GetCommentReturnsNotFoundResultWhenCommentDoesNotExist()
    {
        var article = CreateArticle(1);
        var author = CreateUser(1);
        int commentId = 2;
        _commentServiceMock.Setup(s => s.GetSpecificComment(It.IsAny<int>())).Throws(new ResourceNotFoundException("Comment not found"));
        var controller = new CommentController(_articleServiceMock.Object, _commentServiceMock.Object, _sessionServiceMock.Object, _offensiveWordServiceMock.Object);

        var result = controller.GetComment(commentId) as NotFoundObjectResult;

        Assert.IsNotNull(result);
        Assert.AreEqual("Comment not found", result.Value);
    }

    [TestMethod]
    public void CreateCommentWithNonExistingArticleShouldReturnNotFound()
    {
        var newComment = new CommentModel { ArticleId = 1 };
        var currentUser = new User { Id = 2 };
        _sessionServiceMock.Setup(x => x.GetCurrentUser(null)).Returns(currentUser);
        _articleServiceMock.Setup(x => x.GetSpecificArticle(It.IsAny<int>())).Throws(new ResourceNotFoundException("Article not found"));
        var controller = new CommentController(_articleServiceMock.Object, _commentServiceMock.Object, _sessionServiceMock.Object, _offensiveWordServiceMock.Object);

        var result = controller.CreateComment(newComment) as NotFoundObjectResult;

        Assert.IsNotNull(result);
        Assert.AreEqual("Article not found", result.Value);
    }

     [TestMethod]
     public void CreateCommentWithUnauthorizedUserShouldReturnUnauthorized()
     {
        var article = CreateArticle(1, true);
        var newComment = new CommentModel { ArticleId = 1 };
        var currentUser = new User { Id = 2 };
        _sessionServiceMock.Setup(s => s.GetCurrentUser(null)).Returns((User)null);
        _articleServiceMock.Setup(x => x.GetSpecificArticle(It.IsAny<int>())).Returns(article);
        var controller = new CommentController(_articleServiceMock.Object, _commentServiceMock.Object, _sessionServiceMock.Object, _offensiveWordServiceMock.Object);

        var result = controller.CreateComment(newComment);

        Assert.IsInstanceOfType(result, typeof(UnauthorizedObjectResult));
        var message = ((UnauthorizedObjectResult)result).Value.ToString();
        Assert.AreEqual("You are not able to comment this article", message);
     }

    [TestMethod]
    public void CreateCommentReplyShouldReturnBadRequestWhenCommentAlreadyHasReply()
    {
        var commentId = 1;
        var reply = new CommentReplyModel { Content = "test reply" };
        var comment = new Comment { Id = commentId, Reply = new Comment(), Author = new User(), Article = new Article { Author = new User() } };
        var currentUser = new User();

        _commentServiceMock.Setup(x => x.GetSpecificComment(It.IsAny<int>())).Returns(comment);
        _sessionServiceMock.Setup(x => x.GetCurrentUser(null)).Returns(currentUser);

        var controller = new CommentController(_articleServiceMock.Object, _commentServiceMock.Object, _sessionServiceMock.Object, _offensiveWordServiceMock.Object);

        var result = controller.CreateCommentReply(commentId, reply) as BadRequestObjectResult;

        Assert.IsNotNull(result);
        Assert.AreEqual("Cannot reply to a replied comment", result.Value);
    }

    [TestMethod]
    public void CreateCommentReplyWithValidRequestShouldReturnsCreatedAtRoute()
    {
        var article = CreateArticle(1);
        var author = CreateUser(1);
        int commentId = 2;
        int replyId = 3;
        var comment = new Comment { Id = commentId, Author = author, Article = article, Content = "My comment" };

        var reply = new Comment { Id = replyId, Author = author, Content = "My reply" };

        _commentServiceMock.Setup(x => x.GetSpecificComment(It.IsAny<int>())).Returns(comment);
        _sessionServiceMock.Setup(x => x.GetCurrentUser(null)).Returns(author);
        _articleServiceMock.Setup(x => x.GetSpecificArticle(It.IsAny<int>())).Returns(comment.Article);
        _commentServiceMock.Setup(cs => cs.CreateComment(It.IsAny<Comment>())).Returns(reply);
        _commentServiceMock.Setup(c => c.UpdateComment(It.IsAny<int>(), It.IsAny<Comment>())).Returns(comment);

        var controller = new CommentController(_articleServiceMock.Object, _commentServiceMock.Object, _sessionServiceMock.Object, _offensiveWordServiceMock.Object);

        var result = controller.CreateCommentReply(commentId, new CommentReplyModel() { AuthorId =  author.Id, Content = reply.Content });

        var createdResult = result as CreatedAtRouteResult;

        Assert.AreEqual("GetComment", createdResult.RouteName);
        Assert.AreEqual(reply.Id, createdResult.RouteValues["commentId"]);

        var commentResult = createdResult.Value as CommentDetailModel;
        Assert.AreEqual(reply.Id, commentResult.Id);
        Assert.AreEqual(reply.Content, commentResult.Content);
    }


    [TestMethod]
public void CreateCommentWithAuthorizedUserShouldReturnCreatedAtRoute()
{
    var article = CreateArticle(1);
    var author = CreateUser(1);
    var newComment = new CommentModel { ArticleId = article.Id };
    var createdComment = new Comment { Id = 1, Author = author, Article = article, Content = "Test comment" };

    _articleServiceMock.Setup(x => x.GetSpecificArticle(It.IsAny<int>())).Returns(article);
    _sessionServiceMock.Setup(s => s.GetCurrentUser(null)).Returns(author);
    _commentServiceMock.Setup(cs => cs.CreateComment(It.IsAny<Comment>())).Returns(createdComment);
    _offensiveWordServiceMock.Setup(ow => ow.ContainsOffensiveWord(It.IsAny<string>())).Returns(false);

    var controller = new CommentController(_articleServiceMock.Object, _commentServiceMock.Object, _sessionServiceMock.Object, _offensiveWordServiceMock.Object);

    var result = controller.CreateComment(newComment) as CreatedAtRouteResult;

    Assert.IsNotNull(result);
    Assert.AreEqual("GetComment", result.RouteName);
    Assert.AreEqual(createdComment.Id, result.RouteValues["commentId"]);

    var commentResult = result.Value as CommentDetailModel;
    Assert.AreEqual(createdComment.Id, commentResult.Id);
    Assert.AreEqual(createdComment.Content, commentResult.Content);
}

[TestMethod]
public void CreateCommentWithValidDataShouldReturnCreatedAtRoute()
{
    var article = CreateArticle(1);
    var author = CreateUser(1);
    var newComment = new CommentModel { ArticleId = 1 };
    var createdComment = new Comment { Id = 1, Content = "Test comment", Article = article, Author = author };

    _articleServiceMock.Setup(x => x.GetSpecificArticle(It.IsAny<int>())).Returns(article);
    _sessionServiceMock.Setup(s => s.GetCurrentUser(null)).Returns(author);
    _commentServiceMock.Setup(c => c.CreateComment(It.IsAny<Comment>())).Returns(createdComment);
    _offensiveWordServiceMock.Setup(ow => ow.ContainsOffensiveWord(It.IsAny<string>())).Returns(false);

    var controller = new CommentController(_articleServiceMock.Object, _commentServiceMock.Object, _sessionServiceMock.Object, _offensiveWordServiceMock.Object);

    var result = controller.CreateComment(newComment);

    var createdResult = result as CreatedAtRouteResult;

    Assert.AreEqual("GetComment", createdResult.RouteName);
    Assert.AreEqual(createdComment.Id, createdResult.RouteValues["commentId"]);

    var commentResult = createdResult.Value as CommentDetailModel;
    Assert.AreEqual(createdComment.Id, commentResult.Id);
    Assert.AreEqual(createdComment.Content, commentResult.Content);
}

[TestMethod]
public void CreateCommentReplyWithUnauthorizedUserShouldReturnUnauthorized()
{
    var article = CreateArticle(1);
    var author = CreateUser(1);
    int commentId = 2;
    var comment = new Comment { Id = commentId, Author = author, Article = article, Content = "My comment" };

    var currentUser = new User { Id = 3 };

    _commentServiceMock.Setup(x => x.GetSpecificComment(It.IsAny<int>())).Returns(comment);
    _sessionServiceMock.Setup(x => x.GetCurrentUser(null)).Returns(currentUser);
    _articleServiceMock.Setup(x => x.GetSpecificArticle(It.IsAny<int>())).Returns(comment.Article);

    var controller = new CommentController(_articleServiceMock.Object, _commentServiceMock.Object, _sessionServiceMock.Object, _offensiveWordServiceMock.Object);

    var result = controller.CreateCommentReply(commentId, new CommentReplyModel() { AuthorId = author.Id, Content = "My reply" });

    Assert.IsInstanceOfType(result, typeof(UnauthorizedObjectResult));
    var message = ((UnauthorizedObjectResult)result).Value.ToString();
    Assert.AreEqual("You are not able to reply this article", message);
}



[TestMethod]
public void CreateCommentReplyWithNonExistingCommentShouldReturnNotFound()
{
    var reply = new CommentReplyModel { Content = "test reply" };
    int commentId = 1;

    _commentServiceMock.Setup(x => x.GetSpecificComment(It.IsAny<int>())).Throws(new ResourceNotFoundException("Comment not found"));
    var controller = new CommentController(_articleServiceMock.Object, _commentServiceMock.Object, _sessionServiceMock.Object, _offensiveWordServiceMock.Object);

    var result = controller.CreateCommentReply(commentId, reply) as NotFoundObjectResult;

    Assert.IsNotNull(result);
    Assert.AreEqual("Comment not found", result.Value);
    }

    private Article CreateArticle(int articleId, bool isPrivate = false)
    {
        return new Article()
        {
            Id = articleId,
            Title = "Title",
            Content = "Content",
            Private = isPrivate,
            Template = Template.Left,
            CreatedAt = DateTime.Now,
            Author = CreateUser(1)
        };
    }

    private User CreateUser(int authorId)
    {
        return new User()
        {
            Id = authorId,
            FirstName = "Firstname",
            LastName = "Lastname",
            Password = "Password",
            Email = "email@gmail.com",
            Username = "username"
        };
    }

}
