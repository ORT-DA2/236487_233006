using System.ComponentModel.DataAnnotations;
using Blog.Domain.Exceptions;

namespace Blog.Domain;

public class User
{
    public int Id { get; set; }

    private DateTimeOffset? _createdAt;
    public DateTimeOffset? CreatedAt
    {
        get => _createdAt;
        set => _createdAt = value ?? DateTimeOffset.UtcNow;
    }

    public DateTimeOffset? DeletedAt { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }

    [Required]
    [StringLength(50)]
    public string FirstName { get; set; }

    [Required]
    [StringLength(50)]
    public string LastName { get; set; }

    [Required]
    [StringLength(50)]
    public string Username { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(100)]
    public string Email { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 8)]
    public string Password { get; set; }

    public ICollection<Article> Articles {get; set;}

    public ICollection<Comment> Comments { get; set; }

    public ICollection<UserRole> UserRole {get;set;}

    /*
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }
    public string RefreshToken { get; set; } = string.Empty;
    */

    public User() { /* Required by EF */ }


    public void UpdateAttributes(User user)
    {
        FirstName = user.FirstName;
        LastName = user.LastName;
        Username = user.Username;
        Email = user.Email;
        Password = user.Password;
        UserRole = user.UserRole;
    }

    public void ValidOrFail()
    {
        if (string.IsNullOrEmpty(Username))
        {
            throw new InvalidResourceException("Username is empty");
        }

        if (string.IsNullOrEmpty(Password))
        {
            throw new InvalidResourceException("Password is empty");
        }

        if (string.IsNullOrEmpty(Email))
        {
            throw new InvalidResourceException("Email is empty");
        }
    }
}
