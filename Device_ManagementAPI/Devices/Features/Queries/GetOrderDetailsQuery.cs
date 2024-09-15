using Device_ManagementAPI.Dto;
using Device_ManagementAPI.Models;
using MediatR;

namespace Device_ManagementAPI.Devices.Features.OrderHandler
{
    public class GetOrderDetailsQuery : IRequest<OrderDetailsDto>
    {
        public string OrderId { get; set; }
    }
}
