using Blog.Domain;
using Blog.IRepository;

namespace Blog.Services;

public class UserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        return await _userRepository.GetAllAsync();
    }

    public async Task<User> GetByIdAsync(int id)
    {
        return await _userRepository.GetByIdAsync(id);
    }

    public async Task<User> AddAsync(User user)
    {
        // Aditional logic antes de crear user
        return await _userRepository.AddAsync(user);
    }

    public async Task<User> UpdateAsync(User user)
    {
        // Aditional logic antes de update user
        return await _userRepository.UpdateAsync(user);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        // Aquí puedes agregar lógica adicional antes de eliminar el usuario
        return await _userRepository.DeleteAsync(id);
    }
}
