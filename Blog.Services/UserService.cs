using Blog.Domain;
using Blog.Domain.Exceptions;
using Blog.Domain.SearchCriterias;
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

    public List<User> GetAllUsers(UserSearchCriteria searchCriteria)
    {
        return _repository.GetAllBy(searchCriteria.Criteria()).ToList();
    }

    public User GetSpecificUser(int id)
    {
        var userSaved = _repository.GetOneBy(u => u.Id == id);

        if (userSaved == null)
            throw new ResourceNotFoundException($"Could not find specified user {id}");

        return userSaved;
    }

    public User CreateUser(User newUser)
    {
        newUser.ValidOrFail();

        // Check if a user with the same email already exists
        var emailAlreadyExists = _repository.GetOneBy(u => u.Email == newUser.Email);

        if (emailAlreadyExists != null)
        {
            throw new DuplicateResourceException($"A user with the email '{newUser.Email}' already exists.");
        }

        // Check if a user with the same username already exists
        var usernameAlreadyExists = _repository.GetOneBy(u => u.Username == newUser.Username);

        if (usernameAlreadyExists != null)
        {
            throw new DuplicateResourceException($"A user with the username '{newUser.Username}' already exists.");
        }

        _repository.Insert(newUser);
        _repository.Save();
        return newUser;
    }

    public User UpdateUser(int id, User updatedUser)
    {
        updatedUser.ValidOrFail();
        var userSaved = _repository.GetOneBy(u => u.Id == id);

        if (userSaved == null)
            throw new ResourceNotFoundException($"Could not find specified user {id}");

        userSaved.UpdateAttributes(updatedUser);
        _repository.Update(userSaved);
        _repository.Save();

        return userSaved;
    }

    public void DeleteUser(int id)
    {
        var userSaved = _repository.GetOneBy(u => u.Id == id);

        if (userSaved == null)
            throw new ResourceNotFoundException($"Could not find specified user {id}");

        _repository.Delete(userSaved);
        _repository.Save();
    }


}
