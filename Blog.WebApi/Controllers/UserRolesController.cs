using Blog.Domain;
using Blog.Services;
using Microsoft.AspNetCore.Mvc;

namespace Blog.WebApi.Controllers;

[ApiController]
[Route("api/user-roles")]
public class UserRolesController : ControllerBase
{
    private readonly UserRoleService _userRoleService;

    public UserRolesController(UserRoleService userRoleService)
    {
        _userRoleService = userRoleService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var userRoles = await _userRoleService.GetAllAsync();
        return Ok(userRoles);
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetById(int userId)
    {
        var userRole = await _userRoleService.GetByIdAsync(userId);
        if (userRole == null)
        {
            return NotFound();
        }

        return Ok(userRole);
    }

    [HttpPost]
    public async Task<IActionResult> Add(UserRole userRole)
    {
        var newUserRole = await _userRoleService.AddAsync(userRole);
        return CreatedAtAction(nameof(GetById), new { userId = newUserRole.UserId }, newUserRole);
    }

    [HttpPut("{userId}")]
    public async Task<IActionResult> Update(int userId, UserRole userRole)
    {
        if (userId != userRole.UserId)
        {
            return BadRequest();
        }

        var updatedUserRole = await _userRoleService.UpdateAsync(userRole);
        return Ok(updatedUserRole);
    }

    [HttpDelete("{userId}")]
    public async Task<IActionResult> Delete(int userId)
    {
        var success = await _userRoleService.DeleteAsync(userId);
        if (!success)
        {
            return NotFound();
        }

        return NoContent();
    }
}
