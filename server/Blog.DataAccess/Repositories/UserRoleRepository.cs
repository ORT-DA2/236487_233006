using Blog.DataAccess.Contexts;
using Blog.Domain;

namespace Blog.DataAccess;

public class UserRoleRepository : BaseRepository<UserRole>
{

    public UserRoleRepository(BlogContext context) : base(context){}

}
