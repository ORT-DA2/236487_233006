using Blog.Domain;
using Blog.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Blog.WebApi.Filters
{
    public class RoleFilter : Attribute, IAuthorizationFilter
    {
        private readonly RoleType[] _roles;

        public RoleFilter(params RoleType[] roles)
        {
            _roles = roles;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (_roles != null)
            {
                var sessionLogic = GetSessionService(context);
                var currentUser = sessionLogic.GetCurrentUser(Guid.Parse(context.HttpContext.Request.Headers["Authorization"].ToString()));
                bool allowed = false;

                if (currentUser != null)
                {
                    foreach (var role in _roles)
                    {
                        if (currentUser.IsInRole(role))
                        {
                            allowed = true;
                        }
                    }

                    if(!allowed)
                    {
                        context.Result = new ObjectResult(new { Message = "You are not authorized to perform this action" })
                        {
                            StatusCode = 403
                        };
                    }
                }
            }
        }

        protected ISessionService GetSessionService(AuthorizationFilterContext context)
        {
            var sessionHandlerType = typeof(ISessionService);
            var sessionHandlerLogicObject = context.HttpContext.RequestServices.GetService(sessionHandlerType);
            var sessionHandler = sessionHandlerLogicObject as ISessionService;

            return sessionHandler;
        }
    }
}
