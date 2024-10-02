// Handlers/UpdateOrderCommandHandler.cs
using MediatR;
using Device_ManagementAPI.Devices.Features.Repository;
using Device_ManagementAPI.Dto;
using Device_ManagementAPI.Devices.Features.OrderCommands;

namespace Device_ManagementAPI.Devices.Features.Handlers
{
    public class UpdateOrderCommandHandler : IRequestHandler<UpdateOrderCommand, bool>
    {
        private readonly IOrderRepository _orderRepository;

        public UpdateOrderCommandHandler(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task<bool> Handle(UpdateOrderCommand request, CancellationToken cancellationToken)
        {
            var orderDto = request.OrderDto;
            var existingOrder = await _orderRepository.GetOrderByIdAsync(orderDto.Id);

            if (existingOrder == null)
            {
                return false; // Order not found
            }

            // Update the order details
            //existingOrder.Devices = orderDto.Devices;
            existingOrder.OrderDate = orderDto.OrderDate;
            existingOrder.Comments = orderDto.Comments;

            return await _orderRepository.UpdateOrderAsync(existingOrder);
        }
    }
}
