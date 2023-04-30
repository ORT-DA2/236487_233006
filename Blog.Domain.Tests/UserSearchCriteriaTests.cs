using Blog.Domain;
using Blog.Domain.SearchCriterias;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Linq.Expressions;

namespace Blog.Domain.Tests
{
    [TestClass]
    public class UserSearchCriteriaTests
    {
        [TestMethod]
        public void Criteria_WithEmptyUsernameAndEmail_ReturnsTrue()
        {
            var userSearchCriteria = new UserSearchCriteria { Username = "", Email = "" };
            Expression<Func<User, bool>> criteriaExpression = userSearchCriteria.Criteria();
            Func<User, bool> criteriaFunc = criteriaExpression.Compile();

            User testUser = new User { Username = "testUsername", Email = "test@email.com" };
            Assert.IsTrue(criteriaFunc(testUser));
        }

        [TestMethod]
        public void Criteria_WithMatchingUsernameAndEmail_ReturnsTrue()
        {
            var userSearchCriteria = new UserSearchCriteria { Username = "testUsername", Email = "test@email.com" };
            Expression<Func<User, bool>> criteriaExpression = userSearchCriteria.Criteria();
            Func<User, bool> criteriaFunc = criteriaExpression.Compile();

            User testUser = new User { Username = "testUsername", Email = "test@email.com" };
            Assert.IsTrue(criteriaFunc(testUser));
        }

        [TestMethod]
        public void Criteria_WithMismatchedUsernameAndEmail_ReturnsFalse()
        {
            var userSearchCriteria = new UserSearchCriteria { Username = "wrongUsername", Email = "wrong@email.com" };
            Expression<Func<User, bool>> criteriaExpression = userSearchCriteria.Criteria();
            Func<User, bool> criteriaFunc = criteriaExpression.Compile();

            User testUser = new User { Username = "testUsername", Email = "test@email.com" };
            Assert.IsFalse(criteriaFunc(testUser));
        }

        [TestMethod]
        public void Criteria_WithMatchingUsernameAndMismatchedEmail_ReturnsFalse()
        {
            var userSearchCriteria = new UserSearchCriteria { Username = "testUsername", Email = "wrong@email.com" };
            Expression<Func<User, bool>> criteriaExpression = userSearchCriteria.Criteria();
            Func<User, bool> criteriaFunc = criteriaExpression.Compile();

            User testUser = new User { Username = "testUsername", Email = "test@email.com" };
            Assert.IsFalse(criteriaFunc(testUser));
        }

        [TestMethod]
        public void Criteria_WithMismatchedUsernameAndMatchingEmail_ReturnsFalse()
        {
            var userSearchCriteria = new UserSearchCriteria { Username = "wrongUsername", Email = "test@email.com" };
            Expression<Func<User, bool>> criteriaExpression = userSearchCriteria.Criteria();
            Func<User, bool> criteriaFunc = criteriaExpression.Compile();

            User testUser = new User { Username = "testUsername", Email = "test@email.com" };
            Assert.IsFalse(criteriaFunc(testUser));
        }
    }
}
