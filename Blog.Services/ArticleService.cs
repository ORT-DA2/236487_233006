using Blog.Domain;
using Blog.IRepository;
using Blog.IServices;
using Blog.Services.Exceptions;

namespace Blog.Services;

public class ArticleService : IArticleService
{
    private readonly IArticleRepository _articleRepository;

    public ArticleService(IArticleRepository articleRepository)
    {
        _articleRepository = articleRepository;
    }

    public async Task<IEnumerable<Article>> GetAllAsync()
    {
        return await _articleRepository.GetAllAsync();
    }
    
    public async Task<Article> GetByIdAsync(int id)
    {
        return await _articleRepository.GetByIdAsync(id);
    }

    public async Task<Article> AddAsync(Article article)
    {
        article.ValidOrFail();
        return await _articleRepository.AddAsync(article);
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
}