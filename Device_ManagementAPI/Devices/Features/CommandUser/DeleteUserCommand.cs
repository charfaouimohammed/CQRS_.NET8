using MediatR;

namespace Device_ManagementAPI.Devices.Features.CommandUser
{
    public class DeleteUserCommand : IRequest<bool>
    {
        public string Id { get; set; } = string.Empty;
        public DeleteUserCommand(string id)
        {
            Id = id;
        }
    }
}
