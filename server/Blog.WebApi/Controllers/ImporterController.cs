using Microsoft.AspNetCore.Mvc;
using Blog.IServices;
using Blog.WebApi.Filters;
using Blog.Domain;
using Models;
using Models.In;

namespace Blog.WebApi.Controllers
{
    [AuthenticationFilter]
    [Route("api/importers")]
    [ApiController]
    public class ImporterController : ControllerBase
    {
        private readonly IImporterService _importerService;
        private readonly IArticleService _articleService;
        private readonly IUserService _userService;

        public ImporterController(IImporterService importerService, IArticleService articleService, IUserService userService)
        {
            _importerService = importerService;
            _articleService = articleService;
            _userService = userService;
        }

        [HttpGet]
        public IActionResult GetImporters()
        {
            List<string> retrievedImporters = _importerService.GetAllImporters();
            return Ok(retrievedImporters);
        }

        [HttpPost("import")]
        public IActionResult ImportArticles([FromBody] ImporterModel importer)
        {
            List<Article> importedArticles = _importerService.ImportArticles(importer.ImporterName, importer.FilePath);
            List<Article> result = new List<Article>();

            foreach (Article article in importedArticles)
            {
                try
                {
                    User author = _userService.GetSpecificUser(article.Author.Id);
                    article.Author = author;
                    Article created = _articleService.CreateArticle(article);
                    result.Add(created);
                }
                catch
                {
                    // Do nothing
                }
                
            }

            return Ok(result.Select(a => new ArticleDetailModel(a)));
        }
    }
}
