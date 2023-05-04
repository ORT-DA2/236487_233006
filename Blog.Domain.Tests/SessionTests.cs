using Blog.Domain.Entities;

namespace Blog.Domain.Tests
{
    [TestClass]
    public class SessionTests
    {
        [TestMethod]
        public void SessionConstructor_SetsNewAuthToken()
        {
            var session = new Session();
            Assert.AreNotEqual(Guid.Empty, session.AuthToken);
        }

        [TestMethod]
        public void SessionConstructor_WithUser_SetsUserProperty()
        {
            var user = new User
            {
                FirstName = "FirstName",
                LastName = "LastName",
                Username = "username",
                Email = "email@example.com",
                Password = "password1234"
            };

            var session = new Session { User = user };
            Assert.AreEqual(user, session.User);
        }
    }
}
