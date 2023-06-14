using Blog.Domain;
using Blog.Domain.Exceptions;
using Blog.Domain.SearchCriterias;
using Blog.IServices;
using Blog.WebApi.Filters;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Blog.WebApi.Controllers
{
    [AuthenticationFilter]
    [Route("api/articles")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleService _articleService;
        private readonly ISessionService _sessionService;
        private readonly ICommentService _commentService;
        private readonly IOffensiveWordService _offensiveWordService;

        public ArticleController(IArticleService articleService, ISessionService sessionService, ICommentService commentService, IOffensiveWordService wordService)
        {
            _articleService = articleService;
            _sessionService = sessionService;
            _commentService = commentService;
            _offensiveWordService = wordService;
        }

        // Index - Get all articles (/api/articles)
        [AuthenticationFilter]
        [HttpGet]
        public IActionResult GetArticles([FromQuery] ArticleSearchCriteria searchCriteria, string? orderBy, string? direction, int? limit)
        {
            try
            {
                User currentUser = _sessionService.GetCurrentUser();
                var result = _articleService.GetAllArticles(searchCriteria, orderBy, direction, limit);
                result = result.Where(a => !a.Private || (a.Private && (a.Author.Equals(currentUser) || currentUser.IsInRole(RoleType.Admin)))).ToList();
                return Ok(result.Select(a => new ArticleDetailModel(a)));
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

        // Index - Get recent articles (/api/articles)
        [AuthenticationFilter]
        [HttpGet("recent")]
        public IActionResult GetRecentArticles([FromQuery] ArticleSearchCriteria searchCriteria)
        {
            try
            {
                User currentUser = _sessionService.GetCurrentUser();
                var recentArticles = _articleService.GetRecentArticles(searchCriteria);

                recentArticles = recentArticles.Where(a => !a.Private || (a.Private && a.Author.Equals(currentUser))).Take(10).ToList();

                return Ok(recentArticles.Select(a => new RecentArticleModel(a)));
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


        // Show - Get specific article (/api/articles/{id})
        [HttpGet("{articleId}", Name = "GetArticle")]
        public IActionResult GetArticle(int articleId)
        {
            try
            {
                User currentUser = _sessionService.GetCurrentUser();
                var retrievedArticle = _articleService.GetSpecificArticle(articleId);

                if(!currentUser.IsInRole(RoleType.Admin))
                {
                    if (retrievedArticle.Private && !retrievedArticle.Author.Equals(currentUser))
                    {
                        return Unauthorized("You are not authorized to perform this action");
                    }
                }

                if(retrievedArticle.IsApproved || retrievedArticle.Author.Equals(currentUser) || currentUser.IsInRole(RoleType.Admin) )
                {
                    return Ok(new ArticleDetailModel(retrievedArticle));
                } else
                {
                    return NotFound();
                }
            }
            catch (ResourceNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPost("{articleId}/markAllCommentsAsViewed")]
        public IActionResult MarkAllCommentsAsViewed(int articleId)
        {
            try
            {
                User currentUser = _sessionService.GetCurrentUser();
                var article = _articleService.GetSpecificArticle(articleId);
                if(!article.Author.Equals(currentUser)) {
                    return Unauthorized("You are not authorized to perform this action");
                }
                _commentService.MarkAllArticleCommentsAsViewed(article.Id);
                return NoContent();
            }
            catch (ResourceNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        // Create - Create new article (/api/articles)
        [HttpPost]
        public IActionResult CreateArticle([FromBody] CreateArticleModel newArticle)
        {
            try
            {
                User author = _sessionService.GetCurrentUser();

                if (IsOffensive(newArticle.ToCreateEntity(author))) {
                    newArticle.IsApproved = false;
                } else
                {
                    newArticle.IsApproved = true;
                }

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
        public IActionResult UpdateArticle(int articleId, [FromBody] UpdateArticleModel updatedArticle)
        {
            try
            {
                User currentUser = _sessionService.GetCurrentUser();
                Article retrievedArticle = _articleService.GetSpecificArticle(articleId);

                if (!retrievedArticle.Author.Equals(currentUser) && !currentUser.IsInRole(RoleType.Admin))
                {
                    return Unauthorized("You are not authorized to perform this action");
                }

                if (IsOffensive(updatedArticle.ToUpdateEntity(retrievedArticle.Author)))
                {
                    updatedArticle.IsApproved = false;
                }
                else
                {
                    updatedArticle.IsApproved = true;
                }

                updatedArticle.IsRejected = false;

                var returned = _articleService.UpdateArticle(articleId, updatedArticle.ToUpdateEntity(retrievedArticle.Author));
                
                var articleModel = new ArticleDetailModel(returned);
                return Ok(articleModel);
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

        // Approve Article (/api/articles/{id}/approve)
        [HttpPost("{articleId}/approve")]
        public IActionResult ApproveArticle(int articleId)
        {
            try
            {
                User currentUser = _sessionService.GetCurrentUser();
                Article retrievedArticle = _articleService.GetSpecificArticle(articleId);

                if (!retrievedArticle.Author.Equals(currentUser) && !currentUser.IsInRole(RoleType.Admin))
                {
                    return Unauthorized("You are not authorized to perform this action");
                }

                retrievedArticle.IsApproved = true;
                retrievedArticle.IsRejected = false;

                var returned = _articleService.UpdateArticle(articleId, retrievedArticle);

                var articleModel = new ArticleDetailModel(returned);
                return Ok(articleModel);
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

        // Reject Article (/api/articles/{id}/reject)
        [HttpPost("{articleId}/reject")]
        public IActionResult RejectArticle(int articleId)
        {
            try
            {
                User currentUser = _sessionService.GetCurrentUser();
                Article retrievedArticle = _articleService.GetSpecificArticle(articleId);

                if (!retrievedArticle.Author.Equals(currentUser) && !currentUser.IsInRole(RoleType.Admin))
                {
                    return Unauthorized("You are not authorized to perform this action");
                }

                retrievedArticle.IsApproved = false;
                retrievedArticle.IsRejected = true;

                var returned = _articleService.UpdateArticle(articleId, retrievedArticle);

                var articleModel = new ArticleDetailModel(returned);
                return Ok(articleModel);
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
                User currentUser = _sessionService.GetCurrentUser();
                var article = _articleService.GetSpecificArticle(articleId);
                if (!article.Author.Equals(currentUser))
                {
                    return Unauthorized("You are not authorized to perform this action");
                }
                _articleService.DeleteArticle(articleId);
                return NoContent();
            }
            catch (ResourceNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [ApiExplorerSettings(IgnoreApi = true)] // Exclude this method from Swagger
        public bool IsOffensive(Article article)
        {
            bool offensive = false;

            if (_offensiveWordService.ContainsOffensiveWord(article.Title))
            {
                offensive = true;
            }

            if (_offensiveWordService.ContainsOffensiveWord(article.Content))
            {
                offensive = true;
            }

            return offensive;
        }
    }
}