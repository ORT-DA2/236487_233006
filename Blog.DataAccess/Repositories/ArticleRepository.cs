using Blog.Domain;
using Blog.IRepository;

namespace Blog.Repository;

public class ArticleRepository : IArticleRepository
{
    public Task<IEnumerable<Article>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Article> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<Article> AddAsync(Article article)
    {
        throw new NotImplementedException();
    }

    public Task<Article> UpdateAsync(int id, Article updatedArticle)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }
}