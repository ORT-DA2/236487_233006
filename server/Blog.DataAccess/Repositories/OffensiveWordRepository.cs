using Blog.DataAccess.Contexts;
using Blog.Domain;

namespace Blog.DataAccess;

public class OffensiveWordRepository : BaseRepository<OffensiveWord>
{
    public OffensiveWordRepository(BlogContext context) : base(context) { }
}
