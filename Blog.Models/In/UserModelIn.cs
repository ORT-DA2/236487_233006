using Blog.Domain;

namespace Models.In;


public class UserModelIn
{
    public string FirstName { get; set; }

    public string LastName { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }

    public ICollection<int> roles {get;set;}
    // Mapping the recieved DTO to my Domain
    public User ToCreateEntity()
    {
        return new User()
        {
            FirstName = this.FirstName,
            LastName = this.LastName,
            Username = this.Username,
            Email = this.Email,
            Password = this.Password,
            CreatedAt = DateTimeOffset.UtcNow,

        };
    }

    public User ToUpdateEntity()
    {
        return new User()
        {
            FirstName = this.FirstName,
            LastName = this.LastName,
            Username = this.Username,
            Email = this.Email,
            Password = this.Password,
            UpdatedAt = DateTimeOffset.UtcNow
        };
    }

}
