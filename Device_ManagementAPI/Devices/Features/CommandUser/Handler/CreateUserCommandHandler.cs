using Device_ManagementAPI.Devices.UserRepository;
using Device_ManagementAPI.Models;
using MediatR;
using BCrypt.Net;
using Device_ManagementAPI.Devices.Features.Repository;
using Device_ManagementAPI.Devices.Features.CommandUser;

namespace Device_ManagementAPI.Devices.Features.CommandUser.Handler
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, bool>
    {
        private readonly IUserRepository _userRepository;

        public CreateUserCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var user = new User
            {
                Username = request.Username,
                Firstname = request.Firstname,
                Lastname = request.Lastname,
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password) // Hash the password
            };

            await _userRepository.CreateUserAsync(user);
            return true;
        }
    }
}
