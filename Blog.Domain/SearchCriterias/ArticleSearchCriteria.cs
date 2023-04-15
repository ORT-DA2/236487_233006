using System.Linq.Expressions;

namespace Blog.Domain.SearchCriterias
{
    public class ArticleSearchCriteria
    {
        public string? Title { get; set; }
        public string? Content { get; set; }

        public Expression<Func<Article, bool>> Criteria()
        {
            return a => String.IsNullOrEmpty(Title) && String.IsNullOrEmpty(Content) || a.Title == Title && a.Content == Content;
        }
    }
}
