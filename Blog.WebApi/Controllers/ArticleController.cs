using Blog.IServices;
using Blog.Services;
using Blog.WebApi.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Models;
using ResourceNotFoundException = Blog.Services.Exceptions.ResourceNotFoundException;

namespace Blog.WebApi.Controllers
{
    [Route("api/articles")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleService _articleService;
        private readonly ICommentService _commentService;

        public ArticleController(IArticleService articleService, ICommentService commentService)
        {
            _articleService = articleService;
            _commentService = commentService;
        }

        // Index - Get all articles (/api/articles)
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _articleService.GetAllAsync();
            return Ok(result.Select(a => new ArticleModel(a)));
        }
        
        // Show - Get specific article (/api/article/{id})
        [HttpGet("{articleId}", Name = "GetById")]
        public async Task<IActionResult> GetById(int articleId)
        {
            try
            {
                var retrievedArticle = await _articleService.GetByIdAsync(articleId);
                return Ok(new ArticleModel(retrievedArticle));
            }
            catch (ResourceNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        // Create - Create new article (/api/articles)
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] ArticleModel newArticle)
        {
            try
            {
                var createdArticle = await _articleService.AddAsync(newArticle.ToEntity());
                var articleModel = new ArticleModel(createdArticle);
                return CreatedAtRoute("GetById", new { articleId = articleModel.Id }, articleModel);
            }
            catch (InvalidResourceException e)
            {
                return BadRequest(e.Message);
            }
        }
        
        // Create - Create new article comment (/api/articles/{id}/comments)
        [HttpPost("{articleId}/comments")]
        public async Task<IActionResult> AddComment(int articleId, [FromBody] CommentModel newComment)
        {
            try
            {
                var article = await _articleService.GetByIdAsync(articleId);

                newComment.Article = article;

                var createdComment = await _commentService.AddAsync(newComment.ToEntity());
                
                var commmentModel = new CommentModel(createdComment);

                return CreatedAtRoute("GetCommentById", new { commentId = commmentModel.Id }, commmentModel);
            }
            catch (InvalidResourceException e)
            {
                return BadRequest(e.Message);
            }
        }
        
        // Get - Get specific article comment (/api/articles/comments/{id})
        [HttpGet("comments/{commentId}")]
        public async Task<IActionResult> GetCommentById(int commentId)
        {
            try
            {
                var comment = await _commentService.GetByIdAsync(commentId);
                return Ok(new CommentModel(comment));
            }
            catch (ResourceNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }
        
        // Get - Get all article comments (/api/articles/{id}/comments)
        [HttpGet("{articleId}/comments")]
        public async Task<IActionResult> GetComments(int articleId)
        {
            try
            {
                var article = await _articleService.GetByIdAsync(articleId);
                var comments = await _commentService.GetAllByArticleAsync(article.Id);
                return Ok(comments);
            }
            catch (InvalidResourceException e)
            {
                return BadRequest(e.Message);
            }
        }

        // Update - Update specific article (/api/articles/{id})
        [HttpPut("{articleId}")]
        public async Task<IActionResult> Update(int articleId, [FromBody] ArticleModel updatedArticle)
        {
            try
            {
                var retrievedArticle = await _articleService.UpdateAsync(articleId, updatedArticle.ToEntity());
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
        public async Task<IActionResult> Delete(int articleId)
        {
            try
            {
                await _articleService.DeleteAsync(articleId);
                return NoContent();
            }
            catch (ResourceNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }
    }
}