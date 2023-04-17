using Blog.Domain.SearchCriterias;
using Blog.IServices;
using Blog.WebApi.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.In;
using ResourceNotFoundException = Blog.Services.Exceptions.ResourceNotFoundException;

namespace Blog.WebApi.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IArticleService _articleService;
        private readonly ICommentService _commentService;
        private readonly IUserService _userService;

        public CommentController(IArticleService articleService, ICommentService commentService, IUserService userService)
        {
            _articleService = articleService;
            _commentService = commentService;
            _userService = userService;
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
                var article = _articleService.GetSpecificArticle(newComment.ArticleId);
                var author = _userService.GetSpecificUser(newComment.AuthorId);

                var createdComment = _commentService.CreateComment(newComment.ToCreateEntity(author, article));
                
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
                if(comment.Reply != null)
                {
                    return BadRequest("Cannot reply to a replied comment");
                } 
                var author = _userService.GetSpecificUser(comment.Author.Id);
                var article = _articleService.GetSpecificArticle(comment.Article.Id);

                var createdComment = _commentService.CreateComment(reply.ToCreateEntity(author, article));

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
    }
}