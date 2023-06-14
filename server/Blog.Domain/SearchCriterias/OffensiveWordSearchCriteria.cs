using System.Linq.Expressions;

namespace Blog.Domain.SearchCriterias
{
    public class OffensiveWordSearchCriteria
    {
        public string? Word { get; set; }

        public Expression<Func<OffensiveWord, bool>> Criteria()
        {
            return ow => Word == null || ow.Word == Word;
        }
    }
}
