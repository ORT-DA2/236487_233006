using Blog.Domain;
using Blog.Domain.Exceptions;
using Blog.IServices;
using Blog.Services;
using Microsoft.AspNetCore.Mvc;
using Models.In;
using Models.Out;

namespace Blog.WebApi.Controllers;

[ApiController]
[Route("api/roles")]
public class RoleController : ControllerBase
{
    private readonly IRoleService _roleService;

    public RoleController(IRoleService roleService)
    {
        _roleService = roleService;
    }

    // Index - Get all roles (/api/roles)
    [HttpGet]
    public IActionResult GetRoles()
    {
        try
        {
            var retrievedRoles = _roleService.GetAllRoles();
            return Ok( new RoleModelOut(retrievedRoles));
        }
        catch (ResourceNotFoundException e)
        {
            return NotFound(e.Message);
        }
    }



}
