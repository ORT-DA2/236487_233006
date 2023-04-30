using Blog.DataAccess;
using Blog.DataAccess.Contexts;
using Blog.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Blog.DataAccess.Tests;

[TestClass]
    public class CommentRepositoryTests
    {
        private readonly CommentRepository _repository;
        private readonly BlogContext _blogContext;

        public CommentRepositoryTests()
        {
            _blogContext = ContextFactory.GetNewContext(ContextType.SQLite);
            _repository = new CommentRepository(_blogContext);
        }

        [TestInitialize]
        public void SetUp()
        {
            _blogContext.Database.OpenConnection();
            _blogContext.Database.EnsureCreated();
        }

        [TestCleanup]
        public void CleanUp()
        {
            _blogContext.Database.EnsureDeleted();
        }

        [TestMethod]
        public void GetAllBy_ShouldReturnCorrectComments()
        {
            // Arrange
            var user = new User { FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", Password = "password456" };
            _blogContext.Users.Add(user);
            _blogContext.SaveChanges();

            var article = new Article { Author = user, Title = "Article", Content = "Content", Private = false, Template = Template.Left };
            _blogContext.Articles.Add(article);
            _blogContext.SaveChanges();

            var comment1 = new Comment { Author = user, Article = article, Content = "Comment 1", CreatedAt = DateTime.UtcNow };
            var comment2 = new Comment { Author = user, Article = article, Content = "Comment 2", CreatedAt = DateTime.UtcNow };
            _blogContext.Comments.AddRange(comment1, comment2);
            _blogContext.SaveChanges();

            // Act
            var comments = _repository.GetAllBy(c => c.Article.Id == article.Id).ToList();

            // Assert
            Assert.AreEqual(2, comments.Count);
            CollectionAssert.Contains(comments, comment1);
            CollectionAssert.Contains(comments, comment2);
        }

        [TestMethod]
        public void GetOneBy_ShouldReturnCorrectComment()
        {
            // Arrange
            var user = new User { FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", Password = "password456" };
            _blogContext.Users.Add(user);
            _blogContext.SaveChanges();

            var article = new Article { Author = user, Title = "Article", Content = "Content", Private = false, Template = Template.Left };
            _blogContext.Articles.Add(article);
            _blogContext.SaveChanges();

            var comment = new Comment { Author = user, Article = article, Content = "Comment", CreatedAt = DateTime.UtcNow };
            _blogContext.Comments.Add(comment);
            _blogContext.SaveChanges();

            // Act
            var foundComment = _repository.GetOneBy(c => c.Id == comment.Id);

            // Assert
            Assert.IsNotNull(foundComment);
            Assert.AreEqual(comment, foundComment);
        }

        [TestMethod]
        public void Insert_ShouldAddNewComment()
        {
            // Arrange
            var user = new User { FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", Password = "password456" };
            _blogContext.Users.Add(user);
            _blogContext.SaveChanges();

            var article = new Article { Author = user, Title = "Article", Content = "Content", Private = false, Template = Template.Left };
            _blogContext.Articles.Add(article);
            _blogContext.SaveChanges();

            var comment = new Comment { Author = user, Article = article, Content = "Comment", CreatedAt =
                        DateTime.UtcNow };

            // Act
            _repository.Insert(comment);
            _blogContext.SaveChanges();

            // Assert
            Assert.AreEqual(1, _blogContext.Comments.Count());
            Assert.IsNotNull(_blogContext.Comments.FirstOrDefault(c => c.Id == comment.Id));
        }

        [TestMethod]
        public void Update_ShouldUpdateCommentAttributes()
        {
            // Arrange
            var user = new User { FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", Password = "password456" };
            _blogContext.Users.Add(user);
            _blogContext.SaveChanges();

            var article = new Article { Author = user, Title = "Article", Content = "Content", Private = false, Template = Template.Left };
            _blogContext.Articles.Add(article);
            _blogContext.SaveChanges();

            var comment = new Comment { Author = user, Article = article, Content = "Comment", CreatedAt = DateTime.UtcNow };
            _blogContext.Comments.Add(comment);
            _blogContext.SaveChanges();

            // Act
            var updatedComment = new Comment { Id = comment.Id, Author = user, Article = article, Content = "Updated Comment", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow };

            // Detach the initial entity from the DbContext
            _blogContext.Entry(comment).State = EntityState.Detached;

            _repository.Update(updatedComment);
            _blogContext.SaveChanges();

            // Assert
            var savedComment = _blogContext.Comments.First(c => c.Id == comment.Id);
            Assert.AreEqual("Updated Comment", savedComment.Content);
            Assert.IsNotNull(savedComment.UpdatedAt);
        }

        [TestMethod]
        public void Delete_ShouldRemoveComment()
        {
            // Arrange
            var user = new User { FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", Password = "password456" };
            _blogContext.Users.Add(user);
            _blogContext.SaveChanges();

            var article = new Article { Author = user, Title = "Article", Content = "Content", Private = false, Template = Template.Left };
            _blogContext.Articles.Add(article);
            _blogContext.SaveChanges();

            var comment = new Comment { Author = user, Article = article, Content = "Comment", CreatedAt = DateTime.UtcNow };
            _blogContext.Comments.Add(comment);
            _blogContext.SaveChanges();

            // Act
            _repository.Delete(comment);
            _blogContext.SaveChanges();

            // Assert
            Assert.AreEqual(0, _blogContext.Comments.Count());
            Assert.IsNull(_blogContext.Comments.FirstOrDefault(c => c.Id == comment.Id));
        }
    }

