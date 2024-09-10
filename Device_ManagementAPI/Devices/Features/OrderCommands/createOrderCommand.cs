using Amazon.Runtime.Internal;
using Device_ManagementAPI.Models;
using MediatR;

namespace Device_ManagementAPI.Devices.Features.OrderCommands
{
    public class createOrderCommand : IRequest<bool>
    {
        public string UserId { get; set; }
        public List<Device> Devices { get; set; }
        public string Comments { get; set; }
    }
}
