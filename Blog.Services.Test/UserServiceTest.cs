using Blog.Domain;
using Blog.Domain.Exceptions;
using Blog.Domain.SearchCriterias;
using Blog.IDataAccess;

namespace Blog.Services.Test;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

    [TestClass]
    public class UserServiceTests
    {
        private Mock<IRepository<User>> _repoMock;
        private UserService _userService;

        [TestInitialize]
        public void Setup()
        {
            _repoMock = new Mock<IRepository<User>>(MockBehavior.Strict);
            _userService = new UserService(_repoMock.Object);
        }

        [TestCleanup]
        public void Cleanup()
        {
            _repoMock.VerifyAll();
        }

        [TestMethod]
        public void GetAllUsers_ReturnsExpectedUsers()
        {
            // Arrange
            var users = new List<User>
            {
                new User { Id = 1, FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", Password = "password123" },
                new User { Id = 2, FirstName = "Jane", LastName = "Doe", Email = "jane.doe@example.com", Password = "password456" }
            };
            _repoMock.Setup(repo => repo.GetAllBy(It.IsAny<Expression<Func<User, bool>>>())).Returns(users);
            var searchCriteria = new UserSearchCriteria();

            // Act
            var result = _userService.GetAllUsers(searchCriteria);

            // Assert
            Assert.AreEqual(2, result.Count);
            CollectionAssert.Contains(result, users[0]);
            CollectionAssert.Contains(result, users[1]);
        }

        [TestMethod]
        public void GetSpecificUser_ReturnsExpectedUser()
        {
            // Arrange
            var user = new User { Id = 1, FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", Password = "password123" };
            _repoMock.Setup(repo => repo.GetOneBy(It.IsAny<Expression<Func<User, bool>>>())).Returns(user);

            // Act
            var result = _userService.GetSpecificUser(user.Id);

            // Assert
            Assert.AreEqual(user.Id, result.Id);
        }

        [TestMethod]
        [ExpectedException(typeof(ResourceNotFoundException))]
        public void GetNonExistingUser_ThrowsException()
        {
            // Arrange
            _repoMock.Setup(repo => repo.GetOneBy(It.IsAny<Expression<Func<User, bool>>>())).Returns(default(User));

            // Act
            _userService.GetSpecificUser(-1);
        }

        [TestMethod]
        public void CreateUser_AddsNewUser()
        {
            // Arrange
            var newUser = new User { FirstName = "John", LastName = "Doe", Username = "jdoe9411", Email = "john.doe@example.com", Password = "password123" };
            _repoMock.Setup(repo => repo.GetOneBy(It.IsAny<Expression<Func<User, bool>>>())).Returns(default(User));
            _repoMock.Setup(repo => repo.Insert(newUser)).Verifiable();
            _repoMock.Setup(repo => repo.Save()).Verifiable();

            // Act
            var createdUser = _userService.CreateUser(newUser);

            // Assert
            Assert.AreEqual(newUser, createdUser);
        }

        /*
        [TestMethod]
        public void UpdateUser_UpdatesUserAttributes()
        {
            // Arrange
            var existingUser = new User { Id = 1, FirstName = "John", LastName = "Doe", Username = "jdoe9411", Email = "john.doe@example.com", Password = "password123" };
            var updatedUser = new User { FirstName = "Jane", LastName = "Doe", Username = "jdoe9411", Email = "jane.doe@example.com", Password = "password456" };

            _repoMock.Setup(repo => repo.GetOneBy(u => u.Id == existingUser.Id)).Returns(existingUser);
            _repoMock.Setup(repo => repo.GetOneBy(u => u.Email == updatedUser.Email && u.Id != existingUser.Id)).Returns(default(User));
            _repoMock.Setup(repo => repo.GetOneBy(u => u.Username == updatedUser.Username && u.Id != existingUser.Id)).Returns(default(User));
            _repoMock.Setup(repo => repo.Update(It.IsAny<User>())).Callback<User>(user =>
            {
                existingUser.FirstName = updatedUser.FirstName;
                existingUser.LastName = updatedUser.LastName;
                existingUser.Email = updatedUser.Email;
                existingUser.Password = updatedUser.Password;
            }).Verifiable();
            _repoMock.Setup(repo => repo.Save()).Verifiable();

            // Act
            var updatedResult = _userService.UpdateUser(existingUser.Id, updatedUser);

            // Assert
            Assert.AreEqual(existingUser, updatedResult);
            Assert.AreEqual(updatedUser.FirstName, updatedResult.FirstName);
            Assert.AreEqual(updatedUser.LastName, updatedResult.LastName);
            Assert.AreEqual(updatedUser.Email, updatedResult.Email);
            Assert.AreEqual(updatedUser.Password, updatedResult.Password);
        }
    */


        [TestMethod]
        public void DeleteUser_RemovesUser()
        {
            // Arrange
            var user = new User { Id = 1, FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", Password = "password123" };
            _repoMock.Setup(repo => repo.GetOneBy(It.IsAny<Expression<Func<User, bool>>>())).Returns(user);
            _repoMock.Setup(repo => repo.Delete(user)).Verifiable();
            _repoMock.Setup(repo => repo.Save()).Verifiable();

            // Act
            _userService.DeleteUser(user.Id);

            // Assert
            // No additional assertions needed; method calls are verified in the TestCleanup
        }

        [TestMethod]
        [ExpectedException(typeof(ResourceNotFoundException))]
        public void DeleteNonExistingUser_ThrowsException()
        {
            // Arrange
            _repoMock.Setup(repo => repo.GetOneBy(It.IsAny<Expression<Func<User, bool>>>())).Returns(default(User));

            // Act
            _userService.DeleteUser(-1);
        }

}
