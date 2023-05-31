using System;
using System.Net;
using System.Security.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Blog.IServices;
using Blog.WebApi.Controllers;
using Models.In;
using Blog.Domain;

namespace Blog.WebApi.Tests
{
    [TestClass]
    public class SessionControllerTest
    {
        private Mock<ISessionService> _sessionServiceMock;

        [TestInitialize]
        public void Setup()
        {
            _sessionServiceMock = new Mock<ISessionService>();
        }

        [TestMethod]
        public void Login_ValidCredentials_ReturnsOK()
        {
            // Arrange
            User currentUser = new User()
            {
                Id = 1,
                FirstName = "Firstname",
                LastName = "Lastname",
                Password = "Password",
                Email = "email@gmail.com",
                Username = "username"
            };
            var sessionModel = new SessionModel { Email = "test@example.com", Password = "password" };
            Guid token = Guid.NewGuid();
            _sessionServiceMock.Setup(service => service.GetCurrentUser(It.IsAny<Guid>())).Returns(currentUser);
            _sessionServiceMock.Setup(service => service.Authenticate(sessionModel.Email, null, sessionModel.Password)).Returns(token);
            var controller = new SessionController(_sessionServiceMock.Object);

            // Act
            var result = controller.Login(sessionModel) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual((int)HttpStatusCode.OK, result.StatusCode);
        }



        [TestMethod]
        public void Login_InvalidCredentials_ReturnsBadRequest()
        {
            // Arrange
            var sessionModel = new SessionModel { Email = "test@example.com", Password = "wrong_password" };
            _sessionServiceMock.Setup(service => service.Authenticate(sessionModel.Email, null, sessionModel.Password)).Throws<InvalidCredentialException>();
            var controller = new SessionController(_sessionServiceMock.Object);

            // Act
            var result = controller.Login(sessionModel) as BadRequestObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual((int)HttpStatusCode.BadRequest, result.StatusCode);
        }

        [TestMethod]
        public void Logout_ValidToken_ReturnsNoContent()
        {
            // Arrange
            var token = Guid.NewGuid();
            _sessionServiceMock.Setup(service => service.Logout(token)).Verifiable();
            var controller = new SessionController(_sessionServiceMock.Object);

            // Act
            var result = controller.Logout(token) as NoContentResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual((int)HttpStatusCode.NoContent, result.StatusCode);
            _sessionServiceMock.Verify();
        }

        [TestMethod]
        public void Logout_InvalidToken_ReturnsBadRequest()
        {
            // Arrange
            var token = Guid.NewGuid();
            _sessionServiceMock.Setup(service => service.Logout(token)).Throws<InvalidCredentialException>();
            var controller = new SessionController(_sessionServiceMock.Object);

            // Act
            var result = controller.Logout(token) as BadRequestObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual((int)HttpStatusCode.BadRequest, result.StatusCode);
        }
    }
}
