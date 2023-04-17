using Blog.Domain;

namespace Blog.IServices;

public interface ISessionService
{
    User? GetCurrentUser(Guid? authToken = null);
    Guid Authenticate(string email, string password);
    void Logout(Guid authorization);
}