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

        [TestMethod]
        public void MarkAllArticleCommentsAsViewed_ShouldUpdateComments_WhenMatchingCommentsExist()
        {
            // Arrange
            var user = new User { FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", Password = "password456" };
            _blogContext.Users.Add(user);
            _blogContext.SaveChanges();

            var article1 = new Article { Author = user, Title = "Article 1", Content = "Content", Private = false, Template = Template.Left };
            _blogContext.Articles.Add(article1);

            var article2 = new Article { Author = user, Title = "Article 2", Content = "Content", Private = false, Template = Template.Left };
            _blogContext.Articles.Add(article2);

            var comment1 = new Comment { Author = user, Article = article1, Content = "Comment 1", CreatedAt = DateTime.UtcNow };
            var comment2 = new Comment { Author = user, Article = article2, Content = "Comment 2", CreatedAt = DateTime.UtcNow };
            var comment3 = new Comment { Author = user, Article = article1, Content = "Comment 3", CreatedAt = DateTime.UtcNow };
            _blogContext.Comments.AddRange(comment1, comment2, comment3);
            _blogContext.SaveChanges();

            // Act
            _repository.MarkAllArticleCommentsAsViewed(article1.Id);
            _blogContext.SaveChanges();

            // Assert
            var savedComments = _blogContext.Comments.ToList();
            var viewedComments = savedComments.Where(c => c.IsViewed).ToList();
            var unviewedComments = savedComments.Where(c => !c.IsViewed).ToList();

            Assert.AreEqual(2, viewedComments.Count);
            Assert.AreEqual(1, unviewedComments.Count);
            Assert.IsTrue(viewedComments.All(c => c.Article.Id == article1.Id));
            Assert.IsTrue(unviewedComments.All(c => c.Article.Id == article2.Id));
        }


        [TestMethod]
        public void MarkAllArticleCommentsAsViewed_ShouldNotUpdateComments_WhenNoMatchingComments()
        {
            // Arrange
            var user = new User { FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", Password = "password456" };
            _blogContext.Users.Add(user);
            _blogContext.SaveChanges();

            var article = new Article { Author = user, Title = "Article", Content = "Content", Private = false, Template = Template.Left };
            _blogContext.Articles.Add(article);
            _blogContext.SaveChanges();

            var comment = new Comment();
            // Act
            _repository.MarkAllArticleCommentsAsViewed(0);
            _blogContext.SaveChanges();

            // Assert
            var savedComments = _blogContext.Comments.ToList();
            Assert.AreEqual(0, savedComments.Count(c => c.IsViewed));
        }

         [TestMethod]
    public void GetAllBy_ShouldReturnEmptyList_WhenNoMatchingComments()
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
        var comments = _repository.GetAllBy(c => c.Article.Id == 0).ToList();

        // Assert
        Assert.AreEqual(0, comments.Count);
    }

    [TestMethod]
    public void GetOneBy_ShouldReturnNull_WhenNoMatchingComment()
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
        var foundComment = _repository.GetOneBy(c => c.Id == 0);

        // Assert
        Assert.IsNull(foundComment);
    }

    }

