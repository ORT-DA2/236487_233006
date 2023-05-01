using Blog.Domain;
using Blog.Domain.Exceptions;
using Blog.IServices;
using Blog.Services;
using Blog.WebApi.Filters;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.In;
using Models.Out;

namespace Blog.WebApi.Controllers;

[AuthenticationFilter]
[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IRoleService _roleService;
    private readonly IUserRoleService _userRoleService;
    private readonly ISessionService _sessionService;

    public UserController(IUserService userService, IRoleService roleService, IUserRoleService userRoleService, ISessionService sessionService)
    {
        _userService = userService;
        _roleService = roleService;
        _userRoleService = userRoleService;
        _sessionService = sessionService;
    }

    // Index - Get all users (/api/users)
    [RoleFilter(RoleType.Admin, RoleType.Blogger)]
    [HttpGet]
    public IActionResult GetUsers([FromQuery] UserSearchCriteriaModel searchCriteria)
    {
        var retrievedUsers = _userService.GetAllUsers(searchCriteria.ToEntity());
        return Ok(retrievedUsers.Select(u => new UserModelOut(u)));
    }

    // Get users ranking (/api/users/ranking)
    [HttpGet("ranking")]
    public IActionResult GetUsersRanking([FromQuery] string startDate, [FromQuery] string endDate)
    {
        try
        {
            DateTime start = DateTime.Parse(startDate);
            DateTime end = DateTime.Parse(endDate);

            if(start >= end)
            {
                return BadRequest("Invalid date format");
            }

            var retrievedUsers = _userService.GetUsersRanking(start, end);
            return Ok(retrievedUsers.Select(u => new UserModelOut(u)));
        }
        catch (FormatException)
        {
            return BadRequest("Invalid date format");
        }
       
    }

    // Get user activities (/api/users/activities)
    [HttpGet("activities")]
    public IActionResult GetUserActivities()
    {
        User currentUser = _sessionService.GetCurrentUser();
        List<Comment> comments =  new List<Comment>();
        currentUser.Articles.ToList().ForEach(a =>
        {
            if(a.Comments != null)
            {
                List<Comment> newComments = a.Comments.Where(c => !c.IsViewed && !c.Author.Equals(currentUser)).ToList();
                comments.AddRange(newComments);
            }
        });
        return Ok(comments.Select(c => new CommentDetailModel(c)));
    }

    // Show - Get specific user (/api/users/{id})
    [RoleFilter(RoleType.Admin)]
    [HttpGet("{id}", Name = "GetUser")]
    public IActionResult GetUserById(int id)
    {
        try
        {
            var retrievedUser = _userService.GetSpecificUser(id);
            return Ok(new UserModelOut(retrievedUser));
        }
        catch (ResourceNotFoundException e)
        {
            return NotFound(e.Message);
        }
    }

    // Create - Create new user (/api/users)
    [HttpPost]
    [RoleFilter(RoleType.Admin)]
    public IActionResult CreateUser([FromBody] UserModelIn newUser)
    {
        try
        {
            EnsureRolesHasValues(newUser.roles.Count);
            EnsureRolesExists(newUser);

            // 1) Creo User
            var createdUser = _userService.CreateUser(newUser.ToCreateEntity());

            foreach (int roleValue in new HashSet<int>(newUser.roles))
            {
                var role = _roleService.GetSpecificRole(roleValue);
                var userRole = new UserRole()
                {
                    User = createdUser,
                    Role = role
                };

                _userRoleService.CreateUserRole(userRole);
            }


            var userModel = new UserModelOut(createdUser);
            return CreatedAtRoute("GetUser", new { id = userModel.Id }, userModel);
        }
        catch (InvalidResourceException e)
        {
            return BadRequest(e.Message);
        }
        catch (DuplicateResourceException e)
        {
            return Conflict(e.Message);
        }
        catch (ResourceNotFoundException e)
        {
            return NotFound(e.Message);
        }
    }

    // Update - Update specific user (/api/users/{id})
    [HttpPut("{id}")]
    [RoleFilter(RoleType.Admin)]
    public IActionResult Update(int id, [FromBody] UserModelIn updatedUser)
    {
        try
        {
            EnsureRolesHasValues(updatedUser.roles.Count);
            EnsureRolesExists(updatedUser);

            // 1) Creo User
            var retrievedUser = _userService.UpdateUser(id, updatedUser.ToUpdateEntity());

            foreach (int roleValue in new HashSet<int>(updatedUser.roles))
            {
                var role = _roleService.GetSpecificRole(roleValue);
                var userRole = new UserRole()
                {
                    User = retrievedUser,
                    Role = role
                };

                _userRoleService.CreateUserRole(userRole);
            }


            return Ok(new UserModelOut(retrievedUser));
        }
        catch (InvalidResourceException e)
        {
            return BadRequest(e.Message);
        }
        catch (ResourceNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (DuplicateResourceException e)
        {
            return Conflict(e.Message);
        }
    }

    // Delete - Delete specific user (/api/users/{id})
    [HttpDelete("{id}")]
    [RoleFilter(RoleType.Admin)]
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



    private void EnsureRolesHasValues(int rolesLength)
    {
        if (rolesLength == 0) throw new InvalidResourceException("User should have at least one role");
    }

    private void EnsureRolesExists(UserModelIn user)
    {
        foreach (int roleValue in new HashSet<int>(user.roles))
        {
            var role = _roleService.GetSpecificRole(roleValue);
        }
    }
}
