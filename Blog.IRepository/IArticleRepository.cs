using Blog.Domain;

namespace Blog.IRepository;

public interface IArticleRepository
{
    Task<IEnumerable<Article>> GetAllAsync();
    Task<Article> GetByIdAsync(int id);
    Task<Article> AddAsync(Article article);
    Task<Article> UpdateAsync(int id, Article updatedArticle);
    Task<bool> DeleteAsync(int id);
}