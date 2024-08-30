using Device_ManagementAPI.Devices.UserQueris;
using Device_ManagementAPI.Devices.UserRepository;
using Device_ManagementAPI.Models;
using MediatR;

namespace Device_ManagementAPI.Devices.UserHandler
{
    public class GetUserByUsernameQueryHandler : IRequestHandler<GetUserByUsernameQuery, User?>
    {
        private readonly IUserRepository _userRepository;

        public GetUserByUsernameQueryHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User?> Handle(GetUserByUsernameQuery request, CancellationToken cancellationToken)
        {
            return await _userRepository.GetUserByUsernameAsync(request.Username);
        }
    }
}
