namespace Blog.Domain;

public class Role
{
    public int UserId { get; set; }
    public RoleType RoleType { get; set; }

    public ICollection<UserRole> UserRole {get;set;}

    public Role() { /* Requerido por EF */ }
}

public enum RoleType
{
    Admin,
    Blogger
}
