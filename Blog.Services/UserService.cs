using Blog.Domain;
using Blog.Domain.Exceptions;
using Blog.Domain.SearchCriteria;
using Blog.IDataAccess;
using Blog.IServices;

namespace Blog.Services;

public class UserService : IUserService
{
    private readonly IRepository<User> _repository;

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

    public User CreateUser(User user)
    {
        user.ValidOrFail();
        _repository.Insert(user);
        _repository.Save();
        return user;
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
