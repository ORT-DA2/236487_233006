using Blog.Domain;
using Blog.IServices;
using Blog.WebApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Net;
using Blog.Domain.Exceptions;
using Models.Out;

namespace Blog.WebApi.Tests
{
    [TestClass]
    public class RoleControllerTest
    {
        private Mock<IRoleService> _roleServiceMock;

        [TestInitialize]
        public void Setup()
        {
            _roleServiceMock = new Mock<IRoleService>(MockBehavior.Strict);
        }

        [TestCleanup]
        public void Cleanup()
        {
            _roleServiceMock.VerifyAll();
        }

        [TestMethod]
        public void GetRoles_ReturnsAllRoles()
        {
            var roles = new List<Role>
            {
                new Role { Id = 1, RoleType = RoleType.Admin },
                new Role { Id = 2, RoleType = RoleType.Blogger }
            };

            _roleServiceMock.Setup(service => service.GetAllRoles()).Returns(roles);

            var controller = new RoleController(_roleServiceMock.Object);

            var result = controller.GetRoles() as OkObjectResult;

            Assert.IsNotNull(result);
            Assert.AreEqual((int)HttpStatusCode.OK, result.StatusCode);

            var rolesResult = result.Value as RoleModelOut;

            Assert.IsNotNull(rolesResult);
            Assert.AreEqual(roles.Count, rolesResult.roles.Count);
        }

        [TestMethod]
        public void GetRoles_ReturnsNotFound_WhenNoRolesPresent()
        {
            _roleServiceMock.Setup(service => service.GetAllRoles()).Throws(new ResourceNotFoundException("No roles found"));

            var controller = new RoleController(_roleServiceMock.Object);

            var result = controller.GetRoles() as NotFoundObjectResult;

            Assert.AreEqual((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.AreEqual("No roles found", result.Value);
        }
    }
}
