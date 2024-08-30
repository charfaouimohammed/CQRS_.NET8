using MediatR;

namespace Device_ManagementAPI.Devices.UserCommand
{
    public class CreateUserCommand : IRequest<bool>
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
