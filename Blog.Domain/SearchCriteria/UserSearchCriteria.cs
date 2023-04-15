namespace Blog.Domain.SearchCriteria;
using System.Linq.Expressions;

public class UserSearchCriteria
{
    public string? Username { get; set; }
    public string? Email { get; set; }

    public Expression<Func<User, bool>> Criteria()
    {
        return u => String.IsNullOrEmpty(Username) && String.IsNullOrEmpty(Email) || u.Username == Username && u.Email == Email;
    }
}
