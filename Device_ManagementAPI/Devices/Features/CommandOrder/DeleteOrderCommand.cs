using Amazon.Runtime.Internal;
using MediatR;

namespace Device_ManagementAPI.Devices.Features.CommandOrder
{
    public class DeleteOrderCommand : IRequest<bool>
    {
        public string OrderId { get; set; }
    }
}
