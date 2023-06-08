using System.Linq.Expressions;

namespace Blog.Domain.SearchCriterias
{
    public class CommentSearchCriteria
    {
        public int? ArticleId { get; set; }

        public Expression<Func<Comment, bool>> Criteria()
        {
            return c => ArticleId == null || c.Author.Id == ArticleId;
        }
    }
}
