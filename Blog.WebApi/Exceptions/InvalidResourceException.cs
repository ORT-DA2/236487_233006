namespace Blog.WebApi.Exceptions;

public class InvalidResourceException: Exception
{
    public InvalidResourceException(string message) : base(message)
    {
    }
}