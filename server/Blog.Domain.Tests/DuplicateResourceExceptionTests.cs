using Blog.Domain.Exceptions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace Blog.Domain.Tests
{
    [TestClass]
    public class DuplicateResourceExceptionTests
    {
        [TestMethod]
        public void DuplicateResourceException_CreatesExceptionWithMessage()
        {
            var message = "This is a test message.";
            var exception = new DuplicateResourceException(message);

            Assert.IsNotNull(exception);
            Assert.IsInstanceOfType(exception, typeof(Exception));
            Assert.AreEqual(message, exception.Message);
        }
    }
}
