using Blog.Domain;

namespace IImporter
{
    public interface IImporterInterface
    {
        string Name { get; }
        string Description { get; }

        List<Article> ImportArticles(string filePath);
    }
}