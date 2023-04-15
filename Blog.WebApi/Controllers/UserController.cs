using Blog.Domain.Exceptions;
using Blog.IServices;
using Blog.Services;
using Microsoft.AspNetCore.Mvc;
using Models.In;
using Models.Out;

namespace Blog.WebApi.Controllers;


[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    // Index - Get all users (/api/users)
    [HttpGet]
    public IActionResult GetUsers([FromQuery] UserSearchCriteriaModel searchCriteria)
    {
        var retrievedUsers = _userService.GetAllUsers(searchCriteria.ToEntity());
        return Ok(retrievedUsers.Select(u => new UserOutModel(u)));
    }

    // Show - Get specific user (/api/users/{id})
    [HttpGet("{id}", Name = "GetUser")]
    public async Task<IActionResult> GetUserById(int id)
    {
        try
        {
            var retrievedUser = _userService.GetSpecificUser(id);
            return Ok(new UserDetailModel(retrievedUser));
        }
        catch (ResourceNotFoundException e)
        {
            return NotFound(e.Message);
        }
    }

    // Create - Create new user (/api/users)
    [HttpPost]
    public IActionResult CreateUser([FromBody] UserModel newUser)
    {
        try
        {
            var createdUser = _userService.CreateUser(newUser.ToEntity());
            var userModel = new UserDetailModel(createdUser);
            return CreatedAtRoute("GetUser", new { id = userModel.Id }, userModel);
        }
        catch (InvalidResourceException e)
        {
            return BadRequest(e.Message);
        }
    }

    // Update - Update specific user (/api/users/{id})
    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] UserModel updatedUser)
    {
        try
        {
            var retrievedUser = _userService.UpdateUser(id, updatedUser.ToEntity());
            return Ok(new UserDetailModel(retrievedUser));
        }
        catch (InvalidResourceException e)
        {
            return BadRequest(e.Message);
        }
        catch (ResourceNotFoundException e)
        {
            return NotFound(e.Message);
        }
    }

    // Delete - Delete specific user (/api/users/{id})
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        try
        {
            _userService.DeleteUser(id);
            return Ok();
        }
        catch (ResourceNotFoundException e)
        {
            return NotFound(e.Message);
        }
    }

}
