using System;
using System.Linq;
using System.Text;
using Blog.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;

namespace Blog.WebApi.Filters
{
    public class RoleFilter : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            using var reader = new StreamReader(context.HttpContext.Request.Body, Encoding.UTF8);
            var rolesJson = reader.ReadToEnd();

            int[] roles = JsonConvert.DeserializeObject<int[]>(rolesJson);

            var requiredRolesAttribute = context.ActionDescriptor.EndpointMetadata
                .OfType<RequiredRolesAttribute>()
                .FirstOrDefault();

            if (requiredRolesAttribute != null)
            {
                var sessionLogic = GetSessionService(context);
                var currentUser = sessionLogic.GetCurrentUser(Guid.Parse(context.HttpContext.Request.Headers["Authorization"].ToString()));

                if (currentUser != null && requiredRolesAttribute.Roles.Any(role => roles.Contains(role)))
                {
                    return;
                }
                else
                {
                    context.Result = new ObjectResult(new { Message = "Forbidden" })
                    {
                        StatusCode = 403
                    };
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

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public class RequiredRolesAttribute : Attribute
    {
        public int[] Roles { get; }

        public RequiredRolesAttribute(params int[] roles)
        {
            Roles = roles;
        }
    }
}
