using Device_ManagementAPI.Devices.UserCommand;
using Device_ManagementAPI.Devices.UserQueris;
using Device_ManagementAPI.Devices.UserRepository;
using Device_ManagementAPI.Models;
using MediatR;

namespace Device_ManagementAPI.Devices.UserHandler
{
    public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, bool>
    {
        private readonly IUserRepository _userRepository;

        public DeleteUserCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            return await _userRepository.DeleteUserAsync(request.Id);
        }
    }
}
