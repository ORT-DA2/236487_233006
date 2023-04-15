using Blog.Domain;
using Blog.Domain.SearchCriteria;

namespace Blog.IServices;

public interface IUserService
{
    List<User> GetAllUsers(UserSearchCriteria searchCriteria);
    User GetSpecificUser(int id);
    User CreateUser(User user);
    User UpdateUser(int id, User updatedUser);
    void DeleteUser(int id);
}
