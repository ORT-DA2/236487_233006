using Blog.Domain.SearchCriterias;
using System.Linq.Expressions;

namespace Blog.Domain.Tests
{
    [TestClass]
    public class CommentSearchCriteriaTests
    {
        [TestMethod]
        public void Criteria_WithNullArticleId_ReturnsTrue()
        {
            var commentSearchCriteria = new CommentSearchCriteria { ArticleId = null };
            Expression<Func<Comment, bool>> criteriaExpression = commentSearchCriteria.Criteria();
            Func<Comment, bool> criteriaFunc = criteriaExpression.Compile();

            User testUser = new User { Id = 1 };
            Comment testComment = new Comment { Author = testUser };
            Assert.IsTrue(criteriaFunc(testComment));
        }

        [TestMethod]
        public void Criteria_WithMatchingArticleId_ReturnsTrue()
        {
            var commentSearchCriteria = new CommentSearchCriteria { ArticleId = 1 };
            Expression<Func<Comment, bool>> criteriaExpression = commentSearchCriteria.Criteria();
            Func<Comment, bool> criteriaFunc = criteriaExpression.Compile();

            User testUser = new User { Id = 1 };
            Comment testComment = new Comment { Author = testUser };
            Assert.IsTrue(criteriaFunc(testComment));
        }

        [TestMethod]
        public void Criteria_WithMismatchedArticleId_ReturnsFalse()
        {
            var commentSearchCriteria = new CommentSearchCriteria { ArticleId = 2 };
            Expression<Func<Comment, bool>> criteriaExpression = commentSearchCriteria.Criteria();
            Func<Comment, bool> criteriaFunc = criteriaExpression.Compile();

            User testUser = new User { Id = 1 };
            Comment testComment = new Comment { Author = testUser };
            Assert.IsFalse(criteriaFunc(testComment));
        }
    }
}
