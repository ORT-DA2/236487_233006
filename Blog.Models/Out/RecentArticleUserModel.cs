using Blog.Domain;

namespace Models.Out;

public class RecentArticleUserModel
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public RecentArticleUserModel(User user)
    {
        this.Id = user.Id;
        this.FirstName = user.FirstName;
        this.LastName = user.LastName;
        this.Username = user.Username;
        this.Email = user.Email;
    }
}
