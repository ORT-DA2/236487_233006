using Blog.DataAccess;
using Blog.DataAccess.Contexts;
using Blog.Domain;


namespace Blog.DataAccess;

public class RoleRepository : BaseRepository<Role>
{
    public RoleRepository(BlogContext context) : base(context){}

}
