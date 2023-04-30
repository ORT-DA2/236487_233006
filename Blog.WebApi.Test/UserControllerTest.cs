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

namespace Blog.WebApi.Tests
{
   [TestClass]
    public class UsersControllerTest
    {
        private Mock<IUserService> _userServiceMock;
        private Mock<IRoleService> _roleServiceMock;
        private Mock<IUserRoleService> _userRoleServiceMock;

        [TestInitialize]
        public void Setup()
        {
            _userServiceMock = new Mock<IUserService>(MockBehavior.Strict);
            _roleServiceMock = new Mock<IRoleService>(MockBehavior.Strict);
            _userRoleServiceMock = new Mock<IUserRoleService>(MockBehavior.Strict);
        }

        [TestCleanup]
        public void Cleanup()
        {
            _userServiceMock.VerifyAll();
            _roleServiceMock.VerifyAll();
            _userRoleServiceMock.VerifyAll();
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


          var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object);

          UserSearchCriteriaModel userCriteria = new UserSearchCriteriaModel();
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

            var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object);

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

            var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object);

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

            var createdUser = CreateUser(1);

            _userServiceMock.Setup(service => service.CreateUser(It.IsAny<User>())).Returns(createdUser);
            _roleServiceMock.Setup(service => service.GetSpecificRole(1)).Returns(new Role { Id = 1, RoleType =  RoleType.Admin});
            _roleServiceMock.Setup(service => service.GetSpecificRole(2)).Returns(new Role { Id = 2, RoleType = RoleType.Blogger});

            _userRoleServiceMock.Setup(service => service.CreateUserRole(It.IsAny<UserRole>())).Returns(new UserRole()).Verifiable();

            var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object);

            var result = controller.CreateUser(newUser) as CreatedAtRouteResult;

            Assert.IsNotNull(result);

            var createdUserModel = result.Value as UserModelOut;

            _userServiceMock.Verify(service => service.CreateUser(It.IsAny<User>()), Times.Once());

            Assert.AreEqual(createdUser.Id, createdUserModel.Id);
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

            _userServiceMock.Setup(service => service.UpdateUser(userToUpdate.Id, It.IsAny<User>())).Returns(userToUpdate);
            _roleServiceMock.Setup(service => service.GetSpecificRole(1)).Returns(new Role { Id = 1, RoleType =  RoleType.Admin});

            _userRoleServiceMock.Setup(service => service.CreateUserRole(It.IsAny<UserRole>())).Returns(new UserRole());

            var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object);

            var result = controller.Update(userToUpdate.Id, updatedUserModel) as OkObjectResult;
            Assert.IsNotNull(result);
            Assert.AreEqual((int)HttpStatusCode.OK, result.StatusCode);

            var userModelOut = result.Value as UserModelOut;
            Assert.IsNotNull(userModelOut);
        }

        [TestMethod]
        public void UpdateUser_ReturnsNotFound_WhenUserDoesNotExist()
        {
            int nonExistingUserId = 3;
            var updatedUserModel = new UserModelIn
            {
                FirstName = "UpdatedFirstname",
                LastName = "UpdatedLastname",
                Password = "UpdatedPassword",
                Email = "updatedemail@gmail.com",
                Username = "updatedusername",
                roles = new List<int> { 1 }
            };

            _userServiceMock.Setup(service => service.UpdateUser(nonExistingUserId, It.IsAny<User>())).Throws(new ResourceNotFoundException("User not found"));
            _roleServiceMock.Setup(service => service.GetSpecificRole(1)).Returns(new Role { Id = 1, RoleType =  RoleType.Admin});


            var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object);

            var result = controller.Update(nonExistingUserId, updatedUserModel) as NotFoundObjectResult;

            Assert.AreEqual((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.AreEqual("User not found", result.Value);

        }


        [TestMethod]
        public void DeleteUser_DeletesUserAndReturnsOk()
        {
            var userToDelete = CreateUser(1);

            _userServiceMock.Setup(service => service.DeleteUser(userToDelete.Id));

            var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object);

            var result = controller.Delete(userToDelete.Id) as OkResult;

            Assert.IsNotNull(result);
            Assert.AreEqual((int)HttpStatusCode.OK, result.StatusCode);
        }



        [TestMethod]
        public void GetUsers_ReturnsEmptyList_WhenNoUsersExist()
        {
            _userServiceMock.Setup(service => service.GetAllUsers(It.IsAny<UserSearchCriteria>())).Returns(new List<User>());

            var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object);

            UserSearchCriteriaModel userCriteria = new UserSearchCriteriaModel();
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

            var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object);

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

            var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object);

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

    var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object);

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

    var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object);

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

    var controller = new UserController(_userServiceMock.Object, _roleServiceMock.Object, _userRoleServiceMock.Object);

    var result = controller.Update(userToUpdate.Id, updatedUserModel) as BadRequestObjectResult;

    Assert.IsNotNull(result);
    Assert.AreEqual((int)HttpStatusCode.BadRequest, result.StatusCode);
    Assert.AreEqual("User should have at least one role", result.Value);
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
    }


}