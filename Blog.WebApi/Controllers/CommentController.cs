using Blog.Domain;
using Blog.Domain.Exceptions;
using Blog.Domain.SearchCriterias;
using Blog.IServices;
using Blog.Services;
using Blog.WebApi.Filters;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.In;

namespace Blog.WebApi.Controllers
{
    [AuthenticationFilter]
    [Route("api/comments")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IArticleService _articleService;
        private readonly ICommentService _commentService;
        private readonly ISessionService _sessionService;
        private readonly IOffensiveWordService _offensiveWordService;

        public CommentController(IArticleService articleService, ICommentService commentService, ISessionService sessionService, IOffensiveWordService offensiveWordService)
        {
            _articleService = articleService;
            _commentService = commentService;
            _sessionService = sessionService;
            _offensiveWordService = offensiveWordService;
        }

        // Get - Get all comments (/api/comments)
        [HttpGet]
        public IActionResult GetComments([FromQuery] CommentSearchCriteria searchCriteria)
        {
            try
            {
                var result = _commentService.GetAllComments(searchCriteria);
                return Ok(result.Select(c => new CommentDetailModel(c)));
            }
            catch (InvalidResourceException e)
            {
                return BadRequest(e.Message);
            }
        }

        // Create - Create new comment (/api/comments)
        [HttpPost]
        public IActionResult CreateComment([FromBody] CommentModel newComment)
        {
            try
            {
                User currentUser = _sessionService.GetCurrentUser();
                var article = _articleService.GetSpecificArticle(newComment.ArticleId);

                if(article.Private && !article.Author.Equals(currentUser))
                {
                    return Unauthorized("You are not able to comment this article");
                }

                if (IsOffensive(newComment))
                {
                    newComment.IsApproved = false;
                }
                else
                {
                    newComment.IsApproved = true;
                }

                var createdComment = _commentService.CreateComment(newComment.ToCreateEntity(currentUser, article));
                
                var commentModel = new CommentDetailModel(createdComment);

                return CreatedAtRoute("GetComment", new { commentId = commentModel.Id }, commentModel);
            }
            catch (InvalidResourceException e)
            {
                return BadRequest(e.Message);
            }
            catch (ResourceNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }
        
        // Get - Get specific comment (/api/comments/{id})
        [HttpGet("{commentId}", Name = "GetComment")]
        public IActionResult GetComment(int commentId)
        {
            try
            {
                var comment =  _commentService.GetSpecificComment(commentId);
                return Ok(new CommentDetailModel(comment));
            }
            catch (ResourceNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        // Get - Create a comment reply (/api/comments/{id})
        [HttpPost("{commentId}/reply")]
        public IActionResult CreateCommentReply(int commentId, [FromBody] CommentReplyModel reply)
        {
            try
            {
                var comment = _commentService.GetSpecificComment(commentId);
                var currentUser = _sessionService.GetCurrentUser();
                if (comment.Reply != null)
                {
                    return BadRequest("Cannot reply to a replied comment");
                } 
                var article = _articleService.GetSpecificArticle(comment.Article.Id);

                if (!article.Author.Equals(currentUser))
                {
                    return Unauthorized("You are not able to reply this article");
                }

                reply.IsReply = true;

                var createdComment = _commentService.CreateComment(reply.ToCreateEntity(currentUser, article));

                comment.Reply = createdComment;

                _commentService.UpdateComment(commentId, comment);

                var commentModel = new CommentDetailModel(createdComment);

                return CreatedAtRoute("GetComment", new { commentId = commentModel.Id }, commentModel);
            }
            catch (InvalidResourceException e)
            {
                return BadRequest(e.Message);
            }
            catch (ResourceNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        private bool IsOffensive(CommentModel comment)
        {
            if (_offensiveWordService.ContainsOffensiveWord(comment.Content))
            {
                return true;
            }

            return false;
        }
    }
}