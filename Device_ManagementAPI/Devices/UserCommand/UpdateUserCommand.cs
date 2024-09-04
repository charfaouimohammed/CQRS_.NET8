using Device_ManagementAPI.Models;
using MediatR;

namespace Device_ManagementAPI.Devices.UserCommand
{
    public class UpdateUserCommand : IRequest<bool>
    {
        public string Id { get; set; } = string.Empty;

        public string Firstname { get; set; } = string.Empty;
        public string Lastname { get; set; } = string.Empty;

        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
    
}
