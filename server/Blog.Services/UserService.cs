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

    public List<User> GetUsersRanking(DateTime startDate, DateTime endDate)
    {
        List <User> users = _repository.GetAll().OrderByDescending(u => GetUserArticlesCommentsTotalCount(u.Articles.ToList(), startDate, endDate)).ToList();
        return users;
    }

    public int GetUserArticlesCommentsTotalCount (List<Article> userArticles, DateTime startDate, DateTime endDate)
    {
        int sum = 0;
        userArticles.ForEach(article =>
        {

            sum += article.Comments.Where(c => c.CreatedAt >= startDate && c.CreatedAt <= endDate).ToList().Count;
        });
        return sum;
    }

    public User GetSpecificUser(int id)
    {
        return UserExists(id);
    }

    public User CreateUser(User newUser)
    {
        newUser.ValidOrFail();
        try
        {
        EnsureUsernameIsUnique(-1, newUser);
        EnsureEmailIsUnique(-1, newUser);

        _repository.Insert(newUser);
        _repository.Save();
        return newUser;
        }
        catch (DuplicateResourceException e)
        {
            throw new DuplicateResourceException(e.Message);
        }
    }

    public User UpdateUser(int id, User updatedUser)
    {
        updatedUser.ValidOrFail();

        try
        {
        EnsureUsernameIsUnique(id, updatedUser);
        EnsureEmailIsUnique(id, updatedUser);
        var userSaved = UserExists(id);

        userSaved.UpdateAttributes(updatedUser);
        _repository.Update(userSaved);
        _repository.Save();

        return userSaved;
        }
        catch (DuplicateResourceException e)
        {
            throw new DuplicateResourceException(e.Message);
        }
        catch (ResourceNotFoundException e)
        {
            throw new ResourceNotFoundException(e.Message);
        }

    }

    public void DeleteUser(int id)
    {
        var user = UserExists(id);

        _repository.Delete(user);
        _repository.Save();
    }



    private void EnsureUsernameIsUnique(int id, User user)
    {
        var existingUser = _repository.GetOneBy(u => u.Username == user.Username);

        if (existingUser != null && existingUser.Id != id)
        {
            throw new DuplicateResourceException($"A user with the username '{user.Username}' already exists.");
        }
    }

    private void EnsureEmailIsUnique(int id , User user)
    {
        var existingUser = _repository.GetOneBy(u => u.Email == user.Email);

        if (existingUser != null && existingUser.Id != id)
        {
            throw new DuplicateResourceException($"A user with the email '{user.Email}' already exists.");
        }
    }

    private User UserExists(int id)
    {
        var user = _repository.GetOneBy(u => u.Id == id);

        if (user == null)
            throw new ResourceNotFoundException($"Could not find specified user {id}");

        return user;
    }
}
