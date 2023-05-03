using System.Security.Authentication;
using Blog.Domain.Entities;
using Blog.IServices;
using Blog.IDataAccess;
using Blog.Domain;

namespace Blog.Services;

// Servicio para manejar las sesiones de los usuarios
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

    // Metodo para obtener el usuario actual en sesión
    public User? GetCurrentUser(Guid? authToken = null)
    {
        // Si ya tenemos el usuario actual en caché, lo retornamos
        if (_currentUser != null)
            return _currentUser;

        // Si no se proporciona un token de autenticación, lanzamos una excepción
        if (authToken == null)
            throw new ArgumentException("Cant retrieve user without auth token");

        // Buscamos la sesión asociada al token de autenticación
        var session = _sessionRepository.GetOneBy(s => s.AuthToken == authToken);

        if (session != null)
            _currentUser = session.User;

        return _currentUser;
    }

    // Metodo para autenticar a un usuario y generar un token de autenticación
    public Guid Authenticate(string email, string username, string password)
    {
        var user = _userRepository.GetOneBy(u => (u.Email == email || u.Username == username) && u.Password == password);

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
