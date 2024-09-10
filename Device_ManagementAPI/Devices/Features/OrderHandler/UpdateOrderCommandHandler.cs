using Device_ManagementAPI.Devices.Features.OrderCommands;
using Device_ManagementAPI.Devices.Features.Repository;
using Device_ManagementAPI.Models;
using MediatR;
using MongoDB.Driver;

namespace Device_ManagementAPI.Devices.Features.OrderHandler
{
    public class UpdateOrderCommandHandler : IRequestHandler<UpdateOrderCommad, bool>
    {
        private readonly IOrderRepository _orderRepository;

        // Constructor to inject the order repository
        public UpdateOrderCommandHandler(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        // Handle method to process the update command
        public async Task<bool> Handle(UpdateOrderCommad request, CancellationToken cancellationToken)
        {
            // Fetch the existing order by ID
            var existingOrder = await _orderRepository.GetOrderByIdAsync(request.OrderId);
            if (existingOrder == null)
            {
                return false; // Order not found
            }

            // Update order properties based on the command
            existingOrder.OrderStatus = request.Status;
            existingOrder.DateOfCommand = request.DateOfCommand;
            existingOrder.Departement = request.Departement;

            // Call the repository to update the order
            return await _orderRepository.UpdateOrderAsync(existingOrder);
        }
    }
}
