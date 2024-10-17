// Commands/UpdateOrderCommand.cs
using Device_ManagementAPI.Dto;
using MediatR;

namespace Device_ManagementAPI.Devices.Features.CommandOrder
{
    public class UpdateOrderCommand : IRequest<bool>
    {
        public UpdateOrderDto OrderDto { get; set; }

        public UpdateOrderCommand(UpdateOrderDto orderDto)
        {
            OrderDto = orderDto;
        }
    }
}
