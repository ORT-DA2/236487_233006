using Blog.Domain;

namespace Models.Out;

public class UserOutModel
{
    public string FirstName { get; set; }

    public string LastName { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }

    public List<UserRole> UserRole {get;set;}

    public UserOutModel(User user)
    {
        this.FirstName = user.FirstName;
        this.LastName = user.LastName;
        this.Username = user.Username;
        this.Email = user.Email;
        this.Password = user.Password;
        this.UserRole = user.UserRole.ToList();
    }
}
