namespace Blog.Domain.Exceptions;

public class InvalidResourceException: Exception
{
    public InvalidResourceException(string message) : base(message)
    {
    }
}