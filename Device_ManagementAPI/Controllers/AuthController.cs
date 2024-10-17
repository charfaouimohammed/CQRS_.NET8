using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Device_ManagementAPI.Models;
using Device_ManagementAPI.Dto;
using System.Security.Cryptography;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using MediatR;
using Device_ManagementAPI.Devices.Features.Commands;
using Device_ManagementAPI.Devices.Features.Queries;
using Device_ManagementAPI.Devices.Jwt;
using Device_ManagementAPI.Devices.UserQueris;
using Microsoft.AspNetCore.Authorization;
using Device_ManagementAPI.Devices.Features.OrderHandler;
using Device_ManagementAPI.Devices.Features.CommandUser;
namespace Device_ManagementAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IJwtService _jwtService;

        public UsersController(IMediator mediator, IJwtService jwtService)
        {
            _mediator = mediator;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] CreateUserCommand command)
        {
            var userExists = await _mediator.Send(new GetUserByUsernameQuery(command.Username)) != null;
            if (userExists)
            {
                return BadRequest("User already exists.");
            }

            var result = await _mediator.Send(command);
            return result ? Ok() : BadRequest();
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserCommand command)
        {
            // Retrieve user from database using username
            var user = await _mediator.Send(new GetUserByUsernameQuery(command.Username));

            // Check if user exists and if the password is correct
            if (user == null || !BCrypt.Net.BCrypt.Verify(command.Password, user.Password))
            {
                return Unauthorized();
            }

            // Generate JWT token
            var token = _jwtService.GenerateToken(user);

            // Return token, user ID, and username
            return Ok(new
            {
                Token = token,
                IdUser = user.Id,
                Username = user.Username
            });
        }

        //[HttpPost("login")]
        //public async Task<IActionResult> Login([FromBody] LoginUserCommand command)
        //{
        //    var user = await _mediator.Send(new GetUserByUsernameQuery(command.Username));
        //    if (user == null || !BCrypt.Net.BCrypt.Verify(command.Password, user.Password))
        //    {
        //        return Unauthorized();
        //    }

        //    var token = _jwtService.GenerateToken(user);
        //    return Ok(new { Token = token });
        //}

        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateUser(string id, [FromBody] UpdateUserCommand command)
        //{
        //    if (id != command.Id)
        //        return BadRequest("User ID mismatch");

        //    var result = await _mediator.Send(command);
        //    return result ? NoContent() : NotFound();
        //}

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var result = await _mediator.Send(new DeleteUserCommand(id));
            return result ? NoContent() : NotFound();
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            var users = await _mediator.Send(new GetAllUsersQuery());
            return Ok(users);
        }
        [HttpGet("{username}")]
        public async Task<ActionResult<User>> GetByUsername(string username)
        {
            // Use the GetUserByUsernameQuery to find the user by username
            var user = await _mediator.Send(new GetUserByUsernameQuery(username));

            // Check if the user exists, if not return NotFound
            if (user == null)
            {
                return NotFound($"User with username '{username}' not found.");
            }

            // Return the found user
            return Ok(user);
        }
    }

}
