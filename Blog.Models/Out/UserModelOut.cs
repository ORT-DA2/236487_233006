using Blog.Domain;

namespace Models.Out;

public class UserModelOut
{
    public int Id { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }

    public ICollection<RoleType> roles {get;set;}
    public UserModelOut(User user)
    {
        roles = new List<RoleType>();

        foreach (var userRole in user.UserRole)
        {
            roles.Add(userRole.Role.RoleType);
        }

        this.Id = user.Id;
        this.FirstName = user.FirstName;
        this.LastName = user.LastName;
        this.Username = user.Username;
        this.Email = user.Email;
        this.Password = user.Password;

    }

    public override bool Equals(object? obj)
    {
        var model = obj as UserModelOut;
        return model.Id == Id;
    }
}
