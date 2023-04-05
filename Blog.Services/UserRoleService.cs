using Blog.Domain;
using Blog.IRepository;

namespace Blog.Services;

public class UserRoleService
{
    private readonly IUserRoleRepository _userRoleRepository;

    public UserRoleService(IUserRoleRepository userRoleRepository)
    {
        _userRoleRepository = userRoleRepository;
    }

    public async Task<IEnumerable<UserRole>> GetAllAsync()
    {
        return await _userRoleRepository.GetAllAsync();
    }

    public async Task<UserRole> GetByIdAsync(int userId)
    {
        return await _userRoleRepository.GetByIdAsync(userId);
    }

    public async Task<UserRole> AddAsync(UserRole userRole)
    {
        return await _userRoleRepository.AddAsync(userRole);
    }

    public async Task<UserRole> UpdateAsync(UserRole userRole)
    {
        return await _userRoleRepository.UpdateAsync(userRole);
    }

    public async Task<bool> DeleteAsync(int userId)
    {
        return await _userRoleRepository.DeleteAsync(userId);
    }
}

