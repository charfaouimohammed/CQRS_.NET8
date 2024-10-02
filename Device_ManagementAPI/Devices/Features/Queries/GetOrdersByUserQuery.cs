using Device_ManagementAPI.Models;
using MediatR;

namespace Device_ManagementAPI.Devices.Features.Queries
{
    public class GetOrdersByUserQuery : IRequest<List<Order>>
    {
        public string UserId { get; set; }
    }
}
