using Blog.Domain;
using Blog.IServices;
using Blog.WebApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Blog.Domain.Exceptions;
using Blog.Domain.SearchCriterias;
using Models.In;
using Models.Out;
using Models;

namespace Blog.WebApi.Tests
{
   [TestClass]
    public class UsersControllerTest
    {
        private Mock<IUserService> _userServiceMock;
        private Mock<IRoleService> _roleServiceMock;
        private Mock<IUserRoleService> _userRoleServiceMock;
        private Mock<ISessionService> _sessionServiceMock;
        private UserController _userController;

        [TestInitialize]
        public void Setup()
        {
            _userServiceMock = new Mock<IUserService>(MockBehavior.Strict);
            _roleServiceMock = new Mock<IRoleService>(MockBehavior.Strict);
            _userRoleServiceMock = new Mock<IUserRoleService>(MockBehavior.Strict);
            _sessionServiceMock = new Mock<ISessionService>(MockBehavior.Strict);

            _userController = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object, _sessionServiceMock.Object);
        }

        [TestCleanup]
        public void Cleanup()
        {
            _userServiceMock.VerifyAll();
            _roleServiceMock.VerifyAll();
            _userRoleServiceMock.VerifyAll();
            _sessionServiceMock.VerifyAll();
        }


      [TestMethod]
      public void GetUsers_ReturnsAllUsers()
      {

          var users = new List<User>
          {
              CreateUser(1),
              CreateUser(2)
          };
          UserSearchCriteria criteria = new UserSearchCriteria();
          _userServiceMock.Setup(service => service.GetAllUsers(It.IsAny<UserSearchCriteria>())).Returns(users);


          var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object, _sessionServiceMock.Object);

          UserSearchCriteria userCriteria = new UserSearchCriteria();
          var result = controller.GetUsers(userCriteria) as OkObjectResult;

          var usersResult = result.Value as IEnumerable<UserModelOut>;

          Assert.IsNotNull(usersResult);
          Assert.AreEqual(users.Count, usersResult.Count());

      }

        [TestMethod]
        public void GetUserById_ReturnsUser_WhenUserExists()
        {
            var user = CreateUser(1);

            _userServiceMock.Setup(service => service.GetSpecificUser(user.Id)).Returns(user);

            var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object, _sessionServiceMock.Object);

            var result = controller.GetUserById(user.Id) as OkObjectResult;

            var userModel = result.Value as UserModelOut;

            Assert.AreEqual(user.Id, userModel.Id);
            Assert.AreEqual(user.Username, userModel.Username);
        }

        [TestMethod]
        public void GetUserById_ReturnsNotFound_WhenUserDoesNotExist()
        {
            int nonExistingUserId = 3;
            _userServiceMock.Setup(service => service.GetSpecificUser(nonExistingUserId)).Throws(new ResourceNotFoundException("User not found"));

            var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object, _sessionServiceMock.Object);

            var result = controller.GetUserById(nonExistingUserId) as NotFoundObjectResult;

            Assert.AreEqual((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.AreEqual("User not found", result.Value);
        }


        [TestMethod]
        public void CreateUser_CreatesUserAndReturnsCreatedUser()
        {
            var newUser = new UserModelIn
            {
                FirstName = "Firstname",
                LastName = "Lastname",
                Password = "Password",
                Email = "email@gmail.com",
                Username = "username",
                roles = new List<int> { 1, 2 }
            };

            _roleServiceMock.Setup(service => service.GetSpecificRole(1)).Returns(new Role { Id = 1, RoleType =  RoleType.Admin});
            _roleServiceMock.Setup(service => service.GetSpecificRole(2)).Returns(new Role { Id = 2, RoleType = RoleType.Blogger});
            _userRoleServiceMock.Setup(service => service.CreateUserRole(It.IsAny<UserRole>())).Returns(new UserRole()).Verifiable();
            _userServiceMock.Setup(service => service.CreateUser(It.IsAny<User>())).Returns(newUser.ToCreateEntity());

            var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object, _sessionServiceMock.Object);

            var result = controller.CreateUser(newUser) as CreatedAtRouteResult;

            Assert.IsNotNull(result);

            var createdUserModel = result.Value as UserModelOut;

            _userServiceMock.Verify(service => service.CreateUser(It.IsAny<User>()), Times.Once());

            Assert.AreEqual(newUser.Username, createdUserModel.Username);
        }



        [TestMethod]
        public void UpdateUser_UpdatesUserAndReturnsOk()
        {
            var userToUpdate = CreateUser(1);
            var updatedUserModel = new UserModelIn
            {
                FirstName = "UpdatedFirstname",
                LastName = "UpdatedLastname",
                Password = "UpdatedPassword",
                Email = "updatedemail@gmail.com",
                Username = "updatedusername",
                roles = new List<int> { 1 }
            };
            var currentUser = CreateUser(1);

            _sessionServiceMock.Setup(service => service.GetCurrentUser(null)).Returns(currentUser);
            _userServiceMock.Setup(service => service.UpdateUser(It.IsAny<int>(), It.IsAny<User>())).Returns(userToUpdate);
            _roleServiceMock.Setup(service => service.GetSpecificRole(It.IsAny<int>())).Returns(new Role { Id = 1, RoleType =  RoleType.Admin});
            _userRoleServiceMock.Setup(service => service.CreateUserRole(It.IsAny<UserRole>())).Returns(new UserRole());

            var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object, _sessionServiceMock.Object);

            var result = controller.Update(userToUpdate.Id, updatedUserModel) as OkObjectResult;
            Assert.IsNotNull(result);
            Assert.AreEqual((int)HttpStatusCode.OK, result.StatusCode);

            var userModelOut = result.Value as UserModelOut;
            Assert.IsNotNull(userModelOut);
        }

        [TestMethod]
        public void UpdateUser_ReturnsNotFound_WhenUserDoesNotExist()
        {
            var role = new Role { Id = 1, RoleType = RoleType.Admin };
            var updatedUserModel = new UserModelIn
            {
                FirstName = "UpdatedFirstname",
                LastName = "UpdatedLastname",
                Password = "UpdatedPassword",
                Email = "updatedemail@gmail.com",
                Username = "updatedusername",
                roles = new List<int> { role.Id }
            };

            User currentUser = CreateUser(1);

            _sessionServiceMock.Setup(service => service.GetCurrentUser(null)).Returns(currentUser);
            _userServiceMock.Setup(service => service.UpdateUser(It.IsAny<int>(), It.IsAny<User>())).Throws(new ResourceNotFoundException("User not found"));
            _roleServiceMock.Setup(service => service.GetSpecificRole(It.IsAny<int>())).Returns(role);


            var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object, _sessionServiceMock.Object);

            var result = controller.Update(currentUser.Id, updatedUserModel) as NotFoundObjectResult;

            Assert.AreEqual((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.AreEqual("User not found", result.Value);

        }


        [TestMethod]
        public void DeleteUser_DeletesUserAndReturnsOk()
        {
            var userToDelete = CreateUser(1);

            _userServiceMock.Setup(service => service.DeleteUser(It.IsAny<int>()));

            var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object, _sessionServiceMock.Object);

            var result = controller.Delete(userToDelete.Id) as NoContentResult;

            Assert.AreEqual((int)HttpStatusCode.NoContent, result.StatusCode);
        }



        [TestMethod]
        public void GetUsers_ReturnsEmptyList_WhenNoUsersExist()
        {
            _userServiceMock.Setup(service => service.GetAllUsers(It.IsAny<UserSearchCriteria>())).Returns(new List<User>());

            var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object, _sessionServiceMock.Object);

            UserSearchCriteria userCriteria = new UserSearchCriteria();
            var result = controller.GetUsers(userCriteria) as OkObjectResult;

            var usersResult = result.Value as IEnumerable<UserModelOut>;

            Assert.IsNotNull(usersResult);
            Assert.IsFalse(usersResult.Any());
        }

        [TestMethod]
        public void CreateUser_ReturnsBadRequest_WhenRolesAreEmpty()
        {
            var newUser = new UserModelIn
            {
                FirstName = "Firstname",
                LastName = "Lastname",
                Password = "Password",
                Email = "email@gmail.com",
                Username = "username",
                roles = new List<int>()
            };

            var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object, _sessionServiceMock.Object);

            var result = controller.CreateUser(newUser) as BadRequestObjectResult;

            Assert.IsNotNull(result);
            Assert.AreEqual((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.AreEqual("User should have at least one role", result.Value);
        }

        [TestMethod]
        public void CreateUser_ReturnsConflict_WhenUserEmailOrUsernameAlreadyExists()
        {
            var newUser = new UserModelIn
            {
                FirstName = "Firstname",
                LastName = "Lastname",
                Password = "Password",
                Email = "email@gmail.com",
                Username = "username",
                roles = new List<int> { 1 }
            };

            _userServiceMock.Setup(service => service.CreateUser(It.IsAny<User>())).Throws(new DuplicateResourceException("Email or username already exists"));
            _roleServiceMock.Setup(service => service.GetSpecificRole(1)).Returns(new Role { Id = 1, RoleType = RoleType.Admin });

            var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object, _sessionServiceMock.Object);

            var result = controller.CreateUser(newUser) as ConflictObjectResult;

            Assert.IsNotNull(result);
            Assert.AreEqual((int)HttpStatusCode.Conflict, result.StatusCode);
            Assert.AreEqual("Email or username already exists", result.Value);
        }


        [TestMethod]
        public void CreateUser_EmptyRolesList_ReturnsBadRequest()
        {
            var newUser = new UserModelIn
            {
                FirstName = "Firstname",
                LastName = "Lastname",
                Password = "Password",
                Email = "email@gmail.com",
                Username = "username",
                roles = new List<int>()
            };

            var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object, _sessionServiceMock.Object);

            var result = controller.CreateUser(newUser) as BadRequestObjectResult;

            Assert.IsNotNull(result);
            Assert.AreEqual((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.AreEqual("User should have at least one role", result.Value);
        }

        [TestMethod]
        public void CreateUser_NonExistingRole_ReturnsNotFound()
        {
            var newUser = new UserModelIn
            {
                FirstName = "Firstname",
                LastName = "Lastname",
                Password = "Password",
                Email = "email@gmail.com",
                Username = "username",
                roles = new List<int> { 99 }
            };

            _roleServiceMock.Setup(service => service.GetSpecificRole(99)).Throws(new ResourceNotFoundException("Role not found"));

            var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object, _sessionServiceMock.Object);

            var result = controller.CreateUser(newUser) as NotFoundObjectResult;

            Assert.IsNotNull(result);
            Assert.AreEqual((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.AreEqual("Role not found", result.Value);
        }

        [TestMethod]
        public void UpdateUser_EmptyRolesList_ReturnsBadRequest()
        {
            var userToUpdate = CreateUser(1);
            var updatedUserModel = new UserModelIn
            {
                FirstName = "UpdatedFirstname",
                LastName = "UpdatedLastname",
                Password = "UpdatedPassword",
                Email = "updatedemail@gmail.com",
                Username = "updatedusername",
                roles = new List<int>()
            };

            var currentUser = CreateUser(1);
            _sessionServiceMock.Setup(s => s.GetCurrentUser(null)).Returns(currentUser);

            var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object, _sessionServiceMock.Object);

            var result = controller.Update(userToUpdate.Id, updatedUserModel) as BadRequestObjectResult;

            Assert.IsNotNull(result);
            Assert.AreEqual((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.AreEqual("User should have at least one role", result.Value);
        }

        [TestMethod]
        public void GetUsersRanking_ValidDates_ReturnsOk()
        {
            var startDate = "2022-01-01";
            var endDate = "2022-02-01";
            var users = new List<User>();
            _userServiceMock.Setup(x => x.GetUsersRanking(DateTime.Parse(startDate), DateTime.Parse(endDate)))
                            .Returns(users);

            var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object, _sessionServiceMock.Object);

            var result = controller.GetUsersRanking(startDate, endDate);

            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
            var okResult = (OkObjectResult)result;
            Assert.AreEqual(users.Count, ((IEnumerable<UserModelOut>)okResult.Value).Count());
        }

        [TestMethod]
        public void GetUsersRanking_InvalidDateFormat_ReturnsBadRequest()
        {
            var endDate = "2022-02-01";
            var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object, _sessionServiceMock.Object);

            var result = controller.GetUsersRanking("invalid-start-date", endDate) as BadRequestObjectResult; ;

            Assert.IsNotNull(result);
            Assert.AreEqual((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.AreEqual("Invalid date format", result.Value);
        }

        [TestMethod]
        public void GetUsersRanking_InvalidDateRange_ReturnsBadRequest()
        {
            var startDate = "2022-02-01";
            var endDate = "2022-01-01";
            var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object, _sessionServiceMock.Object);

            var result = controller.GetUsersRanking(startDate, endDate) as BadRequestObjectResult; ;

            Assert.IsNotNull(result);
            Assert.AreEqual((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.AreEqual("Invalid date format", result.Value);
        }

        private User CreateUser(int userId)
        {
            return new User()
            {
                Id = userId,
                FirstName = "Firstname",
                LastName = "Lastname",
                Password = "Password",
                Email = "email@gmail.com",
                Username = "username"
            };
        }


        [TestMethod]
        public void Update_UnauthorizedUser_ReturnsUnauthorizedResult()
        {
            // Arrange
            var updatedUser = new UserModelIn { roles = new List<int> { 1 } };
            var currentUser = new User { Id = 1 };
            _sessionServiceMock.Setup(s => s.GetCurrentUser(null)).Returns(currentUser);

            // Act
            var result = _userController.Update(2, updatedUser) as UnauthorizedObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("You are not authorized to perform this action", result.Value);
        }

        [TestMethod]
        public void GetUserActivities_ReturnsCorrectCommentDetails()
        {
            var currentUser = new User { Id = 1, FirstName = "John", LastName = "Doe", Username = "jdoe9411", Email = "john.doe@example.com", Password = "password123" };
            var article1 = new Article { Id = 1, Title = "Article 1", Content = "Lorem ipsum", Author = currentUser };
            var article2 = new Article { Id = 2, Title = "Article 2", Content = "Dolor sit amet", Author = currentUser };
            var comment1 = new Comment { Id = 1, Content = "Nice article!", Author = new User { Id = 2, FirstName = "Jane", LastName = "Doe", Username = "jane_doe", Email = "jane.doe@example.com", Password = "password456" }, Article = article1 };
            var comment2 = new Comment { Id = 2, Content = "Great job!", Author = new User { Id = 3, FirstName = "Bob", LastName = "Smith", Username = "bob_smith", Email = "bob.smith@example.com", Password = "password789" }, Article = article2 };
            article1.Comments = new List<Comment> { comment1 };
            article2.Comments = new List<Comment> { comment2 };
            currentUser.Articles = new List<Article> { article1, article2 };

            _sessionServiceMock.Setup(svc => svc.GetCurrentUser(null)).Returns(currentUser);

            var result = _userController.GetUserActivities() as OkObjectResult;
            var commentDetails = result.Value as IEnumerable<CommentDetailModel>;

            Assert.IsNotNull(result);
            Assert.IsNotNull(commentDetails);
            Assert.AreEqual(2, commentDetails.Count());
            Assert.IsTrue(commentDetails.Any(c => c.Id == comment1.Id));
            Assert.IsTrue(commentDetails.Any(c => c.Id == comment2.Id));
        }

    }
}
