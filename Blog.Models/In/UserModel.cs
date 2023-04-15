using Blog.Domain;

namespace Models.In;

public class UserModel
{
    public string FirstName { get; set; }

    public string LastName { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }

    public List<UserRole> UserRole {get;set;}

    public User ToEntity()
    {
        return new User()
        {
            FirstName = this.FirstName,
            LastName = this.LastName,
            Username = this.Username,
            Email = this.Email,
            Password = this.Password,
            UserRole = this.UserRole
        };
    }
}
