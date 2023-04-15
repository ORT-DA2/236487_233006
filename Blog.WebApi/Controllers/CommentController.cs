using Blog.Domain.SearchCriterias;
using Blog.IServices;
using Blog.WebApi.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Models;
using ResourceNotFoundException = Blog.Services.Exceptions.ResourceNotFoundException;

namespace Blog.WebApi.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IArticleService _articleService;
        private readonly ICommentService _commentService;

        public CommentController(IArticleService articleService, ICommentService commentService)
        {
            _articleService = articleService;
            _commentService = commentService;
        }

        // Get - Get all comments (/api/comments)
        [HttpGet]
        public IActionResult GetComments([FromQuery] CommentSearchCriteria searchCriteria)
        {
            try
            {
                var result = _commentService.GetAllComments(searchCriteria);
                return Ok(result);
            }
            catch (InvalidResourceException e)
            {
                return BadRequest(e.Message);
            }
        }

        // Create - Create new comment (/api/comments)
        [HttpPost]
        public IActionResult AddComment(int articleId, [FromBody] CommentModel newComment)
        {
            try
            {
                var article = _articleService.GetSpecificArticle(articleId);

                newComment.Article = article;

                var createdComment = _commentService.CreateComment(newComment.ToEntity());
                
                var commentModel = new CommentModel(createdComment);

                return CreatedAtRoute("GetCommentById", new { commentId = commentModel.Id }, commentModel);
            }
            catch (InvalidResourceException e)
            {
                return BadRequest(e.Message);
            }
        }
        
        // Get - Get specific comment (/api/comments/{id})
        [HttpGet("{commentId}", Name = "GetCommentById")]
        public IActionResult GetCommentById(int commentId)
        {
            try
            {
                var comment =  _commentService.GetSpecificComment(commentId);
                return Ok(new CommentModel(comment));
            }
            catch (ResourceNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        // Update - Update specific article (/api/articles/{id})
        [HttpPut("{articleId}")]
        public IActionResult Update(int articleId, [FromBody] ArticleModel updatedArticle)
        {
            try
            {
                var retrievedArticle = _articleService.UpdateArticle(articleId, updatedArticle.ToEntity());
                return Ok(new ArticleModel(retrievedArticle));
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

        // Delete - Delete specific article (/api/articles/{id})
        [HttpDelete("{articleId}")]
        public IActionResult Delete(int articleId)
        {
            try
            {
                _articleService.DeleteArticle(articleId);
                return NoContent();
            }
            catch (ResourceNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }
    }
}