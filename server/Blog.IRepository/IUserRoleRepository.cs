using Blog.Domain;

namespace Blog.IRepository;

public interface IUserRoleRepository
{
    Task<IEnumerable<UserRole>> GetAllAsync();
    Task<UserRole> GetByIdAsync(int userId);
    Task<UserRole> AddAsync(UserRole userRole);
    Task<UserRole> UpdateAsync(UserRole userRole);
    Task<bool> DeleteAsync(int userId);
}
