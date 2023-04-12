
namespace Blog.Models.Out
{
    public class ArticleBasicModel
    {
        public int Id { get; set; }

        public string Title { get; set; }
        
        public string Content { get; set; }

        public ArticleBasicModel(Article article)
        {
            Id = article.Id;
            Title = article.Title;
            Content = article.Content;
        }
    }
}