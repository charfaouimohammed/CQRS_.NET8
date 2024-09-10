using Amazon.Runtime.Internal;
using MediatR;

namespace Device_ManagementAPI.Devices.Features.OrderCommands
{
    public class UpdateOrderCommad : IRequest<bool>
    {
        public string OrderId { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime DateOfCommand { get; set; }
        public string Departement { get; set; } = string.Empty;

    }
}
