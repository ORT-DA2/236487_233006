using Blog.Domain;
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

    /*
    public List<Article> GetAllArticles()
    {
        return _articleRepository.GetAllBy().ToList();
    }
    
    public Article GetById(int id)
    {
        return  _articleRepository.GetByIdAsync(id);
    }

    public Article Add(Article article)
    {
        article.ValidOrFail();
        return _articleRepository.Add(article);
    }

    public async Task<Article> UpdateAsync(int id, Article updatedArticle)
    {
        updatedArticle.ValidOrFail();
        var articleSaved = await _articleRepository.GetByIdAsync(id);

        if (articleSaved == null)
            throw new ResourceNotFoundException($"Could not find specified article {id}");

        return await _articleRepository.UpdateAsync(id, updatedArticle);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var articleSaved = await _articleRepository.GetByIdAsync(id);

        if (articleSaved == null)
            throw new ResourceNotFoundException($"Could not find specified article {id}");

        return await _articleRepository.DeleteAsync(id);
    }
    */
}
