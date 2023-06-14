
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
            var articleSearchCriteria = new ArticleSearchCriteria { q = null };
            Expression<Func<Article, bool>> criteriaExpression = articleSearchCriteria.Criteria();
            Func<Article, bool> criteriaFunc = criteriaExpression.Compile();

            Article testArticle = new Article { Title = "Test title", Content = "Test content" };
            Assert.IsTrue(criteriaFunc(testArticle));
        }

        [TestMethod]
        public void Criteria_WithMatchingTitleAndContent_ReturnsTrue()
        {
            var articleSearchCriteria = new ArticleSearchCriteria { q = "Test title" };
            Expression<Func<Article, bool>> criteriaExpression = articleSearchCriteria.Criteria();
            Func<Article, bool> criteriaFunc = criteriaExpression.Compile();

            Article testArticle = new Article { Title = "Test title", Content = "Test content" };
            Assert.IsTrue(criteriaFunc(testArticle));
        }

        [TestMethod]
        public void Criteria_WithMismatchedTitleAndContent_ReturnsFalse()
        {
            var articleSearchCriteria = new ArticleSearchCriteria { q = "Wrong title" };
            Expression<Func<Article, bool>> criteriaExpression = articleSearchCriteria.Criteria();
            Func<Article, bool> criteriaFunc = criteriaExpression.Compile();

            Article testArticle = new Article { Title = "Test title", Content = "Test content" };
            Assert.IsFalse(criteriaFunc(testArticle));
        }
    }
}
