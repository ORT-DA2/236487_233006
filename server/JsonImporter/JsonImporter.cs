using Blog.Domain;
using IImporter;
using Newtonsoft.Json;

namespace JsonImporter
{
    public class JsonImporter : IImporterInterface
    {
        public string Name => "JSON";
        public string Description => "Importar desde archivo JSON";

        public List<Article> ImportArticles(string filePath)
        {
            var json = File.ReadAllText(filePath);
            var articles = JsonConvert.DeserializeObject<List<Article>>(json);

            return articles;
        }
    }
}