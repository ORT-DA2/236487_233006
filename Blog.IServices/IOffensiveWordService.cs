using Blog.Domain;
using Blog.Domain.SearchCriterias;

namespace Blog.IServices;

public interface IArticleService
{
    List<Article> GetAllArticles(ArticleSearchCriteria searchCriteria, string? orderBy, string? direction, int? limit);
    Article GetSpecificArticle(int id);
    Article CreateArticle(Article article);
    Article UpdateArticle(int id, Article updatedArticle);
    void DeleteArticle(int id);
    List<Article> GetRecentArticles(ArticleSearchCriteria searchCriteria, int limit);
}
