using Blog.Domain;
using Blog.Domain.SearchCriterias;
using Blog.IDataAccess;
using Blog.IServices;
using Blog.Services.Exceptions;

namespace Blog.Services;

public class ArticleService : IArticleService
{
    private readonly IRepository<Article> _repository;

    public ArticleService(IRepository<Article> repository)
    {
        _repository = repository;
    }
    
    public List<Article> GetAllArticles(ArticleSearchCriteria searchCriteria)
    {
        return _repository.GetAllBy(searchCriteria.Criteria()).ToList();
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

        _repository.Delete(articleSaved);
        _repository.Save();
    }

}
