using Blog.Domain;
using Blog.IRepository;

namespace Blog.Repository;

public class UserRoleRepository : IUserRoleRepository
{
    private readonly BlogDbContext _context;

    public UserRoleRepository(BlogDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<UserRole>> GetAllAsync()
    {
        throw new NotImplementedException();
        //return await _context.UserRoles.Include(ur => ur.User).ToListAsync();
    }

    public async Task<UserRole> GetByIdAsync(int userId)
    {
        throw new NotImplementedException();
        //return await _context.UserRoles.Include(ur => ur.User).FirstOrDefaultAsync(ur => ur.UserId == userId);
    }

    public async Task<UserRole> AddAsync(UserRole userRole)
    {
        /*await _context.UserRoles.AddAsync(userRole);
        await _context.SaveChangesAsync();
        return userRole;*/
        throw new NotImplementedException();
    }

    public async Task<UserRole> UpdateAsync(UserRole userRole)
    {
        /*_context.UserRoles.Update(userRole);
        await _context.SaveChangesAsync();
        return userRole;*/
        throw new NotImplementedException();
    }

    public async Task<bool> DeleteAsync(int userId)
    {
        /*var userRole = await GetByIdAsync(userId);
        if (userRole == null)
        {
            return false;
        }

        _context.UserRoles.Remove(userRole);
        await _context.SaveChangesAsync();
        return true;*/
        throw new NotImplementedException();
    }
}
