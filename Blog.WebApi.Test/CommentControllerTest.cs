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

[TestClass]
public class CommentControllerTest
{
    private Mock<IArticleService> _articleServiceMock;
    private Mock<IUserService> _userServiceMock;
    private Mock<ISessionService> _sessionServiceMock;
    private Mock<ICommentService> _commentServiceMock;

    [TestInitialize]
    public void Setup()
    {
        _articleServiceMock = new Mock<IArticleService>(MockBehavior.Strict);
        _userServiceMock = new Mock<IUserService>(MockBehavior.Strict);
        _sessionServiceMock = new Mock<ISessionService>(MockBehavior.Strict);
        _commentServiceMock = new Mock<ICommentService>(MockBehavior.Strict);
    }

    [TestCleanup]
    public void Cleanup()
    {
        _articleServiceMock.VerifyAll();
        _userServiceMock.VerifyAll();
        _sessionServiceMock.VerifyAll();
        _commentServiceMock.VerifyAll();
    }

    [TestMethod]
    public void GetCommentsShouldReturnOkResult()
    {
        var article = CreateArticle(1);
        var author = CreateUser(1);
        var expectedComments = new List<Comment> { new Comment { Id = 1, Content = "Test Comment", Article = article, Author = author } };
        _commentServiceMock.Setup(c => c.GetAllComments(It.IsAny<CommentSearchCriteria>())).Returns(expectedComments);
        var controller = new CommentController(_articleServiceMock.Object, _commentServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object);

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
        var controller = new CommentController(_articleServiceMock.Object, _commentServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object);

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
        var controller = new CommentController(_articleServiceMock.Object, _commentServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object);

        var action = new Action(() => controller.GetComment(commentId));

        Assert.ThrowsException<ResourceNotFoundException>(action);
    }

    [TestMethod]
    public void CreateCommentWithNonExistingArticleShouldReturnNotFound()
    {
        var newComment = new CommentModel { ArticleId = 1, AuthorId = 1 };
        _articleServiceMock.Setup(x => x.GetSpecificArticle(It.IsAny<int>())).Throws(new ResourceNotFoundException("Article not found"));
        var controller = new CommentController(_articleServiceMock.Object, _commentServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object);

        var action = new Action(() => controller.CreateComment(newComment));

        Assert.ThrowsException<ResourceNotFoundException>(action);
    }

    [TestMethod]
     public void CreateCommentWithNonExistingAuthorShouldReturnNotFound()
     {
        var article = CreateArticle(1);
        var newComment = new CommentModel { ArticleId = article.Id, AuthorId = 1 };
        _articleServiceMock.Setup(x => x.GetSpecificArticle(It.IsAny<int>())).Returns(article);
        _userServiceMock.Setup(u => u.GetSpecificUser(It.IsAny<int>())).Throws(new ResourceNotFoundException("Author not found"));
        var controller = new CommentController(_articleServiceMock.Object, _commentServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object);
        
        var action = new Action(() => controller.CreateComment(newComment));

        Assert.ThrowsException<ResourceNotFoundException>(action);
    }

     [TestMethod]
     public void CreateCommentWithUnauthorizedUserShouldReturnUnauthorized()
     {
        var article = CreateArticle(1, true);
        var newComment = new CommentModel { ArticleId = 1, AuthorId = 1 };
        var currentUser = new User { Id = 2 };
        _userServiceMock.Setup(u => u.GetSpecificUser(It.IsAny<int>())).Returns(article.Author);
        _articleServiceMock.Setup(x => x.GetSpecificArticle(It.IsAny<int>())).Returns(article);
        _sessionServiceMock.Setup(s => s.GetCurrentUser(null)).Returns((User)null);
        var controller = new CommentController(_articleServiceMock.Object, _commentServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object);

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

        var controller = new CommentController(_articleServiceMock.Object, _commentServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object);

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
        _userServiceMock.Setup(u => u.GetSpecificUser(It.IsAny<int>())).Returns(comment.Author);
        _articleServiceMock.Setup(x => x.GetSpecificArticle(It.IsAny<int>())).Returns(comment.Article);
        _commentServiceMock.Setup(cs => cs.CreateComment(It.IsAny<Comment>())).Returns(reply);
        _commentServiceMock.Setup(c => c.UpdateComment(It.IsAny<int>(), It.IsAny<Comment>())).Returns(comment);

        var controller = new CommentController(_articleServiceMock.Object, _commentServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object);

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
    var newComment = new CommentModel { ArticleId = article.Id, AuthorId = author.Id };
    var createdComment = new Comment { Id = 1, Author = author, Article = article, Content = "Test comment" };

    _articleServiceMock.Setup(x => x.GetSpecificArticle(It.IsAny<int>())).Returns(article);
    _userServiceMock.Setup(u => u.GetSpecificUser(It.IsAny<int>())).Returns(author);
    _sessionServiceMock.Setup(s => s.GetCurrentUser(null)).Returns(author);
    _commentServiceMock.Setup(cs => cs.CreateComment(It.IsAny<Comment>())).Returns(createdComment);

    var controller = new CommentController(_articleServiceMock.Object, _commentServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object);

    var result = controller.CreateComment(newComment) as CreatedAtRouteResult;

    Assert.IsNotNull(result);
    Assert.AreEqual("GetComment", result.RouteName);
    Assert.AreEqual(createdComment.Id, result.RouteValues["commentId"]);

    var commentResult = result.Value as CommentDetailModel;
    Assert.AreEqual(createdComment.Id, commentResult.Id);
    Assert.AreEqual(createdComment.Content, commentResult.Content);
}

// [TestMethod]
// public void CreateCommentReplyWithUnauthorizedUserShouldReturnUnauthorized()
// {
//     var article = CreateArticle(1);
//     var author = CreateUser(1);
//     var currentUser = CreateUser(2);
//     int commentId = 2;
//     var comment = new Comment { Id = commentId, Author = author, Article = article, Content = "My comment" };
//
//     _commentServiceMock.Setup(x => x.GetSpecificComment(It.IsAny<int>())).Returns(comment);
//     _sessionServiceMock.Setup(x => x.GetCurrentUser(null)).Returns(currentUser);
//
//     var controller = new CommentController(_articleServiceMock.Object, _commentServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object);
//
//     var result = controller.CreateCommentReply(commentId, new CommentReplyModel() { AuthorId = currentUser.Id, Content = "My reply" });
//
//     Assert.IsInstanceOfType(result, typeof(UnauthorizedObjectResult));
//     var message = ((UnauthorizedObjectResult)result).Value.ToString();
//     Assert.AreEqual("You are not able to reply this article", message);
// }

[TestMethod]
public void CreateCommentWithValidDataShouldReturnCreatedAtRoute()
{
    var article = CreateArticle(1);
    var author = CreateUser(1);
    var newComment = new CommentModel { ArticleId = 1, AuthorId = 1 };
    var createdComment = new Comment { Id = 1, Content = "Test comment", Article = article, Author = author };

    _articleServiceMock.Setup(x => x.GetSpecificArticle(It.IsAny<int>())).Returns(article);
    _userServiceMock.Setup(u => u.GetSpecificUser(It.IsAny<int>())).Returns(author);
    _sessionServiceMock.Setup(s => s.GetCurrentUser(null)).Returns(author);
    _commentServiceMock.Setup(c => c.CreateComment(It.IsAny<Comment>())).Returns(createdComment);

    var controller = new CommentController(_articleServiceMock.Object, _commentServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object);

    var result = controller.CreateComment(newComment);

    var createdResult = result as CreatedAtRouteResult;

    Assert.AreEqual("GetComment", createdResult.RouteName);
    Assert.AreEqual(createdComment.Id, createdResult.RouteValues["commentId"]);

    var commentResult = createdResult.Value as CommentDetailModel;
    Assert.AreEqual(createdComment.Id, commentResult.Id);
    Assert.AreEqual(createdComment.Content, commentResult.Content);
}

[TestMethod]
public void GetCommentsShouldReturnBadRequestWhenInvalidResourceExceptionOccurs()
{
    _commentServiceMock.Setup(c => c.GetAllComments(It.IsAny<CommentSearchCriteria>())).Throws(new InvalidResourceException("Invalid search criteria"));
    var controller = new CommentController(_articleServiceMock.Object, _commentServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object);

    IActionResult result;

    try
    {
        result = controller.GetComments(new CommentSearchCriteria());
    }
    catch (InvalidResourceException ex)
    {
        Assert.AreEqual("Invalid search criteria", ex.Message);
        throw;
    }

    Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
    var badRequestResult = result as BadRequestObjectResult;
    Assert.AreEqual("Invalid search criteria", badRequestResult.Value);
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
    _userServiceMock.Setup(u => u.GetSpecificUser(It.IsAny<int>())).Returns(author);
    _articleServiceMock.Setup(x => x.GetSpecificArticle(It.IsAny<int>())).Returns(comment.Article);

    var controller = new CommentController(_articleServiceMock.Object, _commentServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object);

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
    var controller = new CommentController(_articleServiceMock.Object, _commentServiceMock.Object, _userServiceMock.Object, _sessionServiceMock.Object);

    var action = new Action(() => controller.CreateCommentReply(commentId, reply));

    Assert.ThrowsException<ResourceNotFoundException>(action);
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
