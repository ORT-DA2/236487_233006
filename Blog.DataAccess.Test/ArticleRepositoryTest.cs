using Blog.DataAccess.Contexts;
using Blog.Domain;
using Microsoft.EntityFrameworkCore;

namespace Blog.DataAccess.Tests;

[TestClass]
    public class ArticleRepositoryTests
    {

        private readonly ArticleRepository _repository;
        private readonly BlogContext _blogContext;

        public ArticleRepositoryTests()
        {
            _blogContext = ContextFactory.GetNewContext(ContextType.SQLite);
            _repository = new ArticleRepository(_blogContext);
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
        public void GetAllBy_ShouldReturnCorrectArticles()
        {
            // Arrange
            var user = new User { FirstName = "John", LastName = "Doe", Email = "john.doe@example.com" , Password = "password456" };
            _blogContext.Users.Add(user);
            _blogContext.SaveChanges();

            var article1 = new Article { Author = user, Title = "Article 1", Content = "Content 1", Private = false, Template = Template.Left };
            var article2 = new Article { Author = user, Title = "Article 2", Content = "Content 2", Private = true, Template = Template.Right };
            _blogContext.Articles.AddRange(article1, article2);
            _blogContext.SaveChanges();

            // Act
            var articles = _repository.GetAllBy(a => a.Author.Id == user.Id).ToList();

            // Assert
            Assert.AreEqual(2, articles.Count);
            CollectionAssert.Contains(articles, article1);
            CollectionAssert.Contains(articles, article2);
        }

        [TestMethod]
        public void GetOneBy_ShouldReturnCorrectArticle()
        {
            // Arrange
            var user = new User { FirstName = "John", LastName = "Doe", Email = "john.doe@example.com" , Password = "password456" };
            _blogContext.Users.Add(user);
            _blogContext.SaveChanges();

            var article = new Article { Author = user, Title = "Article", Content = "Content", Private = false, Template = Template.Left };
            _blogContext.Articles.Add(article);
            _blogContext.SaveChanges();

            // Act
            var foundArticle = _repository.GetOneBy(a => a.Id == article.Id);

            // Assert
            Assert.IsNotNull(foundArticle);
            Assert.AreEqual(article, foundArticle);
        }

        [TestMethod]
        public void Insert_ShouldAddNewArticle()
        {
            // Arrange
            var user = new User { FirstName = "John", LastName = "Doe", Email = "john.doe@example.com" , Password = "password456" };
            _blogContext.Users.Add(user);
            _blogContext.SaveChanges();

            var article = new Article { Author = user, Title = "Article", Content = "Content", Private = false, Template = Template.Left };

            // Act
            _repository.Insert(article);
            _blogContext.SaveChanges();

            // Assert
            Assert.AreEqual(1, _blogContext.Articles.Count());
            Assert.IsNotNull(_blogContext.Articles.FirstOrDefault(a => a.Id == article.Id));
        }

        [TestMethod]
        public void Update_ShouldUpdateArticleAttributes()
        {
            // Arrange
            var user = new User { FirstName = "John", LastName = "Doe", Email = "john.doe@example.com" , Password = "password456"};
            _blogContext.Users.Add(user);
            _blogContext.SaveChanges();

            var article = new Article { Author = user, Title = "Article", Content = "Content", Private = false, Template = Template.Left };
            _blogContext.Articles.Add(article);
            _blogContext.SaveChanges();
            // Act
            var updatedArticle = new Article { Id = article.Id, Author = user, Title = "Updated Article", Content = "Updated Content", Private = true, Template = Template.Right, UpdatedAt = DateTime.Now };

            // Detach the initial entity from the DbContext
            _blogContext.Entry(article).State = EntityState.Detached;


            _repository.Update(updatedArticle);
            _blogContext.SaveChanges();

            // Assert
            var savedArticle = _blogContext.Articles.First(a => a.Id == article.Id);
            Assert.AreEqual("Updated Article", savedArticle.Title);
            Assert.AreEqual("Updated Content", savedArticle.Content);
            Assert.AreEqual(true, savedArticle.Private);
            Assert.AreEqual(Template.Right, savedArticle.Template);
            Assert.IsNotNull(savedArticle.UpdatedAt);
        }

        [TestMethod]
        public void Delete_ShouldRemoveArticle()
        {
            // Arrange
            var user = new User { FirstName = "John", LastName = "Doe", Email = "john.doe@example.com" , Password = "password456" };
            _blogContext.Users.Add(user);
            _blogContext.SaveChanges();

            var article = new Article { Author = user, Title = "Article", Content = "Content", Private = false, Template = Template.Left };
            _blogContext.Articles.Add(article);
            _blogContext.SaveChanges();

            // Act
            _repository.Delete(article);
            _blogContext.SaveChanges();

            // Assert
            Assert.AreEqual(0, _blogContext.Articles.Count());
            Assert.IsNull(_blogContext.Articles.FirstOrDefault(a => a.Id == article.Id));
        }
    }
