using Blog.Domain.SearchCriterias;
using Blog.IServices;
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

        public ArticleController(IArticleService articleService)
        {
            _articleService = articleService;
        }

        // Index - Get all articles (/api/articles)
        [HttpGet]
        public IActionResult GetArticles([FromQuery] ArticleSearchCriteria searchCriteria)
        {
            var result = _articleService.GetAllArticles(searchCriteria);
            return Ok(result.Select(a => new ArticleModel(a)));
        }
        
        // Show - Get specific article (/api/article/{id})
        [HttpGet("{articleId}", Name = "GetById")]
        public IActionResult GetArticle(int articleId)
        {
            try
            {
                var retrievedArticle = _articleService.GetSpecificArticle(articleId);
                return Ok(new ArticleModel(retrievedArticle));
            }
            catch (ResourceNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        // Create - Create new article (/api/articles)
        [HttpPost]
        public IActionResult CreateArticle([FromBody] ArticleModel newArticle)
        {
            try
            {
                var createdArticle = _articleService.CreateArticle(newArticle.ToEntity());
                var articleModel = new ArticleModel(createdArticle);
                return CreatedAtRoute("GetArticle", new { articleId = articleModel.Id }, articleModel);
            }
            catch (InvalidResourceException e)
            {
                return BadRequest(e.Message);
            }
        }

        // Update - Update specific article (/api/articles/{id})
        [HttpPut("{articleId}")]
        public IActionResult UpdateArticle(int articleId, [FromBody] ArticleModel updatedArticle)
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
        public IActionResult DeleteArticle(int articleId)
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