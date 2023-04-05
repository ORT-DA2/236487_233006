namespace Blog.Domain;

public class UserRole
{
    public int UserId { get; set; }
    public RoleType Role { get; set; }


    // Propiedad de navegación para establecer la relación con User
    public User User { get; set; }

    public UserRole() { /* Requerido por EF */ }
}

public enum RoleType
{
    Admin,
    Blogger
}
