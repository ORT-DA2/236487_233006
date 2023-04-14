using Blog.DataAccess;
using Blog.DataAccess.Contexts;
using Blog.Domain;

namespace Blog.DataAccess;

public class UserRepository : BaseRepository<User>
{

    public UserRepository(BlogContext context) : base(context){}


}


