using System.Linq.Expressions;

namespace Blog.Domain.SearchCriterias
{
    public class CommentSearchCriteria
    {
        public string? Content { get; set; }

        public int? ArticleId { get; set; }

        public Expression<Func<Comment, bool>> Criteria()
        {
            return c => c.Author.Id == ArticleId || c.Content == Content;
        }
    }
}
