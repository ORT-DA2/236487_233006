using System.Security.Authentication;
using Blog.Domain.Entities;
using Blog.IServices;
using Blog.IDataAccess;
using Blog.Domain;

namespace Blog.Services;

public class SessionService : ISessionService
{
    private User? _currentUser;
    private IRepository<Session> _sessionRepository;
    private IRepository<User> _userRepository;

    public SessionService(IRepository<Session> sessionRepository, IRepository<User> userRepository)
    {
        _sessionRepository = sessionRepository;
        _userRepository = userRepository;
    }
    
    public User? GetCurrentUser(Guid? authToken = null)
    {
        if (_currentUser != null)
            return _currentUser;

        if (authToken == null)
            throw new ArgumentException("Cant retrieve user without auth token");

        var session = _sessionRepository.GetOneBy(s => s.AuthToken == authToken);

        if (session != null)
            _currentUser = session.User;

        return _currentUser;
    }

    public Guid Authenticate(string email, string password)
    {
        var user = _userRepository.GetOneBy(u => u.Email == email && u.Password == password);

        if (user == null)
            throw new InvalidCredentialException("Invalid credentials");

        var session = new Session() { User = user };
        _sessionRepository.Insert(session);
        _sessionRepository.Save();

        return session.AuthToken;
    }

    public void Logout(Guid authorization)
    {
        var session = _sessionRepository.GetOneBy(s => s.AuthToken == authorization);

        if (session == null)
            return;

        _sessionRepository.Delete(session);
        _sessionRepository.Save();
    }
}