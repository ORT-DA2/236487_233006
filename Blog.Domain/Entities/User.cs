using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using Blog.Domain.Exceptions;

namespace Blog.Domain;

public class User
{
    public int Id { get; set; }

    public DateTimeOffset CreatedAt { get;set; }

    public DateTimeOffset? DeletedAt { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Username { get; set; } = string.Empty;

    public string Email { get; set; }

    public string Password { get; set; }

    public ICollection<Article> Articles {get; set;}

    public ICollection<Comment> Comments { get; set; }

    public ICollection<UserRole> UserRole {get;set;}

    /*
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }
    public string RefreshToken { get; set; } = string.Empty;
    */

    public User()
    {
        Articles = new List<Article>();
        Comments = new List<Comment>();
        UserRole = new List<UserRole>();
    }


    public void UpdateAttributes(User user)
    {
        FirstName = user.FirstName;
        LastName = user.LastName;
        Username = user.Username;
        Email = user.Email;
        Password = user.Password;
        UserRole = user.UserRole;
        UpdatedAt = user.UpdatedAt;
    }

    public void ValidOrFail()
    {
        this.ValidateUsername();
        this.ValidatePassword();
        this.ValidateEmail();
        this.ValidateFirstName();
        this.ValidateLastName();

    }

    private void ValidateUsername()
    {
        if (string.IsNullOrEmpty(Username))
        {
            throw new InvalidResourceException("Username should not be empty");
        }

        if (Username.Length > 12)
        {
            throw new InvalidResourceException("Username should not exceed 12 characters");
        }

        if (!Regex.IsMatch(Username, "^[a-zA-Z0-9]*$"))
        {
            throw new InvalidResourceException("Username must be alphanumeric and should not contain spaces");
        }

        if (Password.Length > 100)
        {
            throw new InvalidResourceException("Username should not exceed 100 characters");
        }


    }

    private void ValidatePassword()
    {
        if (string.IsNullOrEmpty(Password))
        {
            throw new InvalidResourceException("Password should not be empty");
        }

        if ( Password.Length < 8 )
        {
            throw new InvalidResourceException("Password should have at least 8 characters");
        }

        if (Password.Length > 100)
        {
            throw new InvalidResourceException("Password should not exceed 100 characters");
        }

        if (Password.Contains(' '))
        {
            throw new InvalidResourceException("Password should not contain spaces");
        }
    }

    private void ValidateEmail()
    {
        if (string.IsNullOrEmpty(Email))
        {
            throw new InvalidResourceException("Email should not be empty");
        }

        if ( Email.Length > 100)
        {
            throw new InvalidResourceException("Email should not exceed 100 characters");
        }

        if (!IsValidEmail(Email))
        {
            throw new InvalidResourceException("Please provide a valid email");
        }
    }

    private void ValidateFirstName()
    {
        if (string.IsNullOrEmpty(FirstName))
        {
            throw new InvalidResourceException("FirstName should not be empty");
        }

        if (FirstName.Length > 50)
        {
            throw new InvalidResourceException("FirstName should not exceed 50 characters");
        }
    }

    private void ValidateLastName()
    {
        if (string.IsNullOrEmpty(LastName))
        {
            throw new InvalidResourceException("LastName should not be empty");
        }

        if (LastName.Length > 50)
        {
            throw new InvalidResourceException("LastName should not exceed 50 characters");
        }
    }

    private bool IsValidEmail(string email)
    {
        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
        }
    }
}

