using System.Linq.Expressions;

namespace Blog.Domain.SearchCriterias
{
    public class ArticleSearchCriteria
    {
        public string? q { get; set; }

        public int? authorId { get; set; }

        public Expression<Func<Article, bool>> Criteria()
        {
            return a => (string.IsNullOrEmpty(q) || a.Title.IndexOf(q) >= 0 || a.Content.IndexOf(q) >= 0) &&
                        (authorId == null || a.Author.Id == authorId);
        }
    }
}
