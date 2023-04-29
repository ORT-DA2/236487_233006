using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Blog.IServices;

namespace Blog.WebApi.Filters
{
    // Filtro de autenticación para controlar el acceso a los recursos de la API
    public class AuthenticationFilter : Attribute, IAuthorizationFilter
    {
        // OnAuthorization se ejecuta cuando se aplica este filtro a un recurso (método o controlador) en la API.
        public virtual void OnAuthorization(AuthorizationFilterContext context)
        {
            // Obtener el valor del header "Authorization" de la request
            var authorizationHeader = context.HttpContext.Request.Headers["Authorization"].ToString();
            Guid token = Guid.Empty;

            // Verificar si el header de autorización está vacío o no es un GUID válido
            if (string.IsNullOrEmpty(authorizationHeader) || !Guid.TryParse(authorizationHeader, out token))
            {
                context.Result = new ObjectResult(new { Message = "Authorization header is missing" })
                {
                    StatusCode = 401
                };
            }
            else
            {
                // Obtengo el servicio de sesión y el usuario actual a través del token
                var sessionLogic = this.GetSessionService(context);
                var currentUser = sessionLogic.GetCurrentUser(token);

                // Verificar si el usuario actual es nulo (no autorizado)
                if (currentUser == null)
                {
                    context.Result = new ObjectResult(new { Message = "Unauthorized" })
                    {
                        StatusCode = 401
                    };
                }
            }
        }

        // Método para obtener el servicio de sesión desde el contexto de autorización
        protected ISessionService GetSessionService(AuthorizationFilterContext context)
        {
            var sessionHandlerType = typeof(ISessionService);
            var sessionHandlerLogicObject = context.HttpContext.RequestServices.GetService(sessionHandlerType);
            var sessionHandler = sessionHandlerLogicObject as ISessionService;

            return sessionHandler;
        }
    }
}
