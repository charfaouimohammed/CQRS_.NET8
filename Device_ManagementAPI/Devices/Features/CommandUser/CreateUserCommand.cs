using MediatR;

namespace Device_ManagementAPI.Devices.Features.CommandUser
{
    public class CreateUserCommand : IRequest<bool>
    {
        public string Firstname { get; set; } = string.Empty;
        public string Lastname { get; set; } = string.Empty;

        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
