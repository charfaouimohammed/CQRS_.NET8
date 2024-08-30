using Device_ManagementAPI.Devices.UserQueris;
using Device_ManagementAPI.Devices.UserRepository;
using Device_ManagementAPI.Models;
using MediatR;

namespace Device_ManagementAPI.Devices.UserHandler
{
    public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, List<User>>
    {
        private readonly IUserRepository _userRepository;

        public GetAllUsersQueryHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<List<User>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            return await _userRepository.GetAllUsersAsync();
        }
    }
}
