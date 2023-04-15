using Blog.Domain.SearchCriterias;

namespace Models.In;

public class UserSearchCriteriaModel
{
    public string? Username { get; set; }
    public string? Email { get; set; }

    public UserSearchCriteria ToEntity()
    {
        return new UserSearchCriteria()
        {
            Username = this.Username,
            Email = this.Email
        };
    }
}
