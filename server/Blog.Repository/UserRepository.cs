using Blog.Domain;
using Blog.IRepository;

namespace Blog.Repository;

public class UserRepository : IUserRepository
{
    private readonly BlogDbContext _context;

    public UserRepository(BlogDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        // return await _context.Users.Include(u => u.Roles).ToListAsync();
        throw new NotImplementedException();
    }

    public async Task<User> GetByIdAsync(int id)
    {
        // return await _context.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == id);
        throw new NotImplementedException();
    }

    public async Task<User> AddAsync(User user)
    {
        throw new NotImplementedException();
        //await _context.Users.AddAsync(user);
        //await _context.SaveChangesAsync();
        //return user;
    }

    public async Task<User> UpdateAsync(User user)
    {
        throw new NotImplementedException();
        //_context.Users.Update(user);
        //await _context.SaveChangesAsync();
        //return user;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        /*var user = await GetByIdAsync(id);
        if (user == null)
        {
            return false;
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return true;*/
        throw new NotImplementedException();
    }
}

public class BlogDbContext
{
}


