namespace Blog.Domain.SearchCriterias;
using System.Linq.Expressions;

public class UserSearchCriteria
{
    public string? Username { get; set; }
    public string? Email { get; set; }

    public Expression<Func<User, bool>> Criteria()
    {
        return u => string.IsNullOrEmpty(Username) && string.IsNullOrEmpty(Email) || u.Username == Username && u.Email == Email;
    }
}
