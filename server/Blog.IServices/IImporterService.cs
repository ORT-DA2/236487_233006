
using Blog.Domain;

namespace Blog.IServices
{
    public interface IImporterService
    {
        List<string> GetAllImporters();
        List<Article> ImportArticles(string importerName, string filePath);
    }
}
