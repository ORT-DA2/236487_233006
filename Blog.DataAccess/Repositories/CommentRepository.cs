using Blog.DataAccess.Contexts;
using Blog.Domain;

namespace Blog.DataAccess;

public class CommentRepository : BaseRepository<Comment>
{
    public CommentRepository(BlogContext context) : base(context){}
}
