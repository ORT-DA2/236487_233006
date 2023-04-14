using Blog.Domain;
using Blog.IDataAccess;
using Blog.IServices;

namespace Blog.Services;

public class UserService : IUserService
{
    private readonly IRepository<User> _repository;

    public UserService(IRepository<User> repository)
    {
        _repository = repository;
    }
    /*

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
    */
}
