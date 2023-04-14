using Blog.DataAccess.Contexts;
using Blog.Domain;

namespace Blog.DataAccess;

public class ArticleRepository : BaseRepository<Article>
{
    public ArticleRepository(BlogContext context) : base(context){}
}
