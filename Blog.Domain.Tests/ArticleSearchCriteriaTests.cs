
using Blog.Domain.SearchCriterias;
using System.Linq.Expressions;

namespace Blog.Domain.Tests
{
    [TestClass]
    public class ArticleSearchCriteriaTests
    {
        [TestMethod]
        public void Criteria_WithNullTitleAndContent_ReturnsTrue()
        {
            var articleSearchCriteria = new ArticleSearchCriteria { Title = null, Content = null };
            Expression<Func<Article, bool>> criteriaExpression = articleSearchCriteria.Criteria();
            Func<Article, bool> criteriaFunc = criteriaExpression.Compile();

            Article testArticle = new Article { Title = "Test title", Content = "Test content" };
            Assert.IsTrue(criteriaFunc(testArticle));
        }

        [TestMethod]
        public void Criteria_WithMatchingTitleAndContent_ReturnsTrue()
        {
            var articleSearchCriteria = new ArticleSearchCriteria { Title = "Test title", Content = "Test content" };
            Expression<Func<Article, bool>> criteriaExpression = articleSearchCriteria.Criteria();
            Func<Article, bool> criteriaFunc = criteriaExpression.Compile();

            Article testArticle = new Article { Title = "Test title", Content = "Test content" };
            Assert.IsTrue(criteriaFunc(testArticle));
        }

        [TestMethod]
        public void Criteria_WithMismatchedTitleAndContent_ReturnsFalse()
        {
            var articleSearchCriteria = new ArticleSearchCriteria { Title = "Wrong title", Content = "Wrong content" };
            Expression<Func<Article, bool>> criteriaExpression = articleSearchCriteria.Criteria();
            Func<Article, bool> criteriaFunc = criteriaExpression.Compile();

            Article testArticle = new Article { Title = "Test title", Content = "Test content" };
            Assert.IsFalse(criteriaFunc(testArticle));
        }
    }
}
