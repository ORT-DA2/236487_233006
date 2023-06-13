
using Blog.Domain;
using Blog.IServices;
using IImporter;
using System.Reflection;

namespace Blog.Services
{
    public class ImporterService : IImporterService
    {
        private readonly IOffensiveWordService _offensiveWordService;

        public ImporterService(IOffensiveWordService offensiveWordService)
        {
            _offensiveWordService = offensiveWordService;
        }

        public List<string> GetAllImporters()
        {
            return GetImporterImplementations().Select(importer => importer.Name).ToList();
        }

        public List<Article> ImportArticles(string importerName, string filePath)
        {
            List<IImporterInterface> importers = GetImporterImplementations();
            IImporterInterface? desiredImplementation = null;

            foreach (IImporterInterface importer in importers)
            {
                if (importer.Name == importerName)
                {
                    desiredImplementation = importer;
                    break;
                }
            }

            if (desiredImplementation == null)
                throw new Exception("No se pudo encontrar el importador solicitado");

            List<Article> articles = desiredImplementation.ImportArticles(filePath);

            articles = ValidateAndTransformArticles(articles);

            return articles;
        }

        private List<Article> ValidateAndTransformArticles(List<Article> articles)
        {
            var transformedArticles = new List<Article>();

            foreach (var article in articles)
            {
                // Perform any necessary validations on the article
                if (!IsArticleValid(article))
                {
                    // Skip invalid articles
                    continue;
                }

                // Perform any necessary transformations on the article
                var transformedArticle = TransformArticle(article);

                transformedArticles.Add(transformedArticle);
            }

            return transformedArticles;
        }

        private bool IsArticleValid(Article article)
        {
            try
            {
                article.ValidOrFail();
                return true;
            }
            catch
            {
                return false;
            }
        }

        private Article TransformArticle(Article article)
        {
            // transformation: Perform offensive word validation
            if (IsOffensive(article))
            {
                article.IsApproved = false;
            }
            else
            {
                article.IsApproved = true;
            }

            // transformation: When importing articles they must be in public state
            article.Private = false;

            return article;
        }

        private bool IsOffensive(Article article)
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

        public List<IImporterInterface> GetImporterImplementations()
        {
            List<IImporterInterface> availableImporters = new List<IImporterInterface>();
            string importersPath = "./Importers";
            string[] filePaths = Directory.GetFiles(importersPath);

            foreach (string filePath in filePaths)
            {
                if (filePath.EndsWith(".dll"))
                {
                    FileInfo fileInfo = new FileInfo(filePath);
                    Assembly assembly = Assembly.LoadFile(fileInfo.FullName);

                    foreach (Type type in assembly.GetTypes())
                    {
                        if (typeof(IImporterInterface).IsAssignableFrom(type) && !type.IsInterface)
                        {

                            IImporterInterface importer = (IImporterInterface)Activator.CreateInstance(type);
                            if (importer != null)
                                availableImporters.Add(importer);
                        }
                    }
                }
            }

            return availableImporters;
        }
    }
}
