using Blog.Domain.SearchCriterias;
using Blog.IServices;
using Blog.WebApi.Exceptions;
using Blog.WebApi.Filters;
using Microsoft.AspNetCore.Mvc;
using Models;
using ResourceNotFoundException = Blog.Services.Exceptions.ResourceNotFoundException;

namespace Blog.WebApi.Controllers
{
    [AuthenticationFilter]
    [Route("api/articles")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleService _articleService;
        private readonly IUserService _userService;

        public ArticleController(IArticleService articleService, IUserService userService)
        {
            _articleService = articleService;
            _userService = userService;
        }

        // Index - Get all articles (/api/articles)
        [AuthenticationFilter]
        [HttpGet]
        public IActionResult GetArticles([FromQuery] ArticleSearchCriteria searchCriteria)
        {
            var result = _articleService.GetAllArticles(searchCriteria);
            return Ok(result.Select(a => new ArticleDetailModel(a)));
        }
        
        // Show - Get specific article (/api/article/{id})
        [HttpGet("{articleId}", Name = "GetArticle")]
        public IActionResult GetArticle(int articleId)
        {
            try
            {
                var retrievedArticle = _articleService.GetSpecificArticle(articleId);
                return Ok(new ArticleDetailModel(retrievedArticle));
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
                var author = _userService.GetSpecificUser(newArticle.AuthorId);
                /* if (author == null) TODO: Add current user
                {
                    // If the author is not provided, set the current user as the author.
                    var currentUser = await _userManager.GetUserAsync(User);
                    author = new Author { Name = currentUser.UserName };
                }*/
                var createdArticle = _articleService.CreateArticle(newArticle.ToCreateEntity(author));
                var articleModel = new ArticleDetailModel(createdArticle);
                return CreatedAtRoute("GetArticle", new { articleId = articleModel.Id }, articleModel);
            }
            catch (ResourceNotFoundException e)
            {
                return NotFound(e.Message);
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
                var author = _userService.GetSpecificUser(updatedArticle.AuthorId);
                var retrievedArticle = _articleService.UpdateArticle(articleId, updatedArticle.ToUpdateEntity(author));
                var articleModel = new ArticleDetailModel(retrievedArticle);
                return CreatedAtRoute("GetArticle", new { articleId = articleModel.Id }, articleModel);
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