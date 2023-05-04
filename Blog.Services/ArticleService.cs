using Blog.Domain;
using Blog.Domain.Exceptions;
using Blog.Domain.SearchCriterias;
using Blog.IDataAccess;
using Blog.IServices;

namespace Blog.Services;

public class ArticleService : IArticleService
{
    private readonly IRepository<Article> _repository;

    public ArticleService(IRepository<Article> repository)
    {
        _repository = repository;
    }
    
    public List<Article> GetAllArticles(ArticleSearchCriteria searchCriteria, string? orderBy, string? direction, int? limit)
    {
        var articles = _repository.GetAllBy(searchCriteria.Criteria());

        // filter out deleted articles
        articles = articles.Where(a => a.DeletedAt == null);

        if (!string.IsNullOrEmpty(orderBy))
        {
            if(string.IsNullOrEmpty(direction))
            {
                throw new InvalidResourceException("Invalid direction parameter value. Must be 'asc' or 'desc'.");
            }
            switch (direction?.ToLower())
            {
                case "asc":
                    articles = articles.OrderBy(a => a.GetType().GetProperty(orderBy).GetValue(a, null));
                    break;
                case "desc":
                    articles = articles.OrderByDescending(a => a.GetType().GetProperty(orderBy).GetValue(a, null));
                    break;
            }
        }

        if (limit.HasValue)
        {
            articles = articles.Take(limit.Value);
        }

        return articles.ToList();
    }

    public Article GetSpecificArticle(int id)
    {
        var articleSaved = _repository.GetOneBy(a => a.Id == id);

        if (articleSaved == null)
            throw new ResourceNotFoundException($"Could not find specified article {id}");

        return articleSaved;
    }

    public Article CreateArticle(Article article)
    {
        article.ValidOrFail();
        _repository.Insert(article);
        _repository.Save();
        return article;
    }

    public Article UpdateArticle(int id, Article updatedArticle)
    {
        updatedArticle.ValidOrFail();
        var articleSaved = _repository.GetOneBy(a => a.Id == id);

        if (articleSaved == null)
            throw new ResourceNotFoundException($"Could not find specified article {id}");

        articleSaved.UpdateAttributes(updatedArticle);
        _repository.Update(articleSaved);
        _repository.Save();

        return articleSaved;
    }

    public void DeleteArticle(int id)
    {
        var articleSaved = _repository.GetOneBy(a => a.Id == id);

        if (articleSaved == null)
            throw new ResourceNotFoundException($"Could not find specified article {id}");


        articleSaved.DeletedAt = DateTime.Now;

        articleSaved.UpdateAttributes(articleSaved);
        _repository.Update(articleSaved);
        _repository.Save();
    }



}
