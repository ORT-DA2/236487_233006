namespace Blog.Domain.SearchCriterias;
using System.Linq.Expressions;

public class UserSearchCriteria
{
    public string? Username { get; set; }
    public string? Email { get; set; }

    public Expression<Func<User, bool>> Criteria()
    {
        return u => (string.IsNullOrEmpty(Username) || u.Username == Username) && (string.IsNullOrEmpty(Email) || u.Email == Email);
    }
}
