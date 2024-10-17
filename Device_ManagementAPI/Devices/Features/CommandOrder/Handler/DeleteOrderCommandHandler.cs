using Amazon.Runtime.Internal;
using Device_ManagementAPI.Devices.Features.CommandOrder;
using Device_ManagementAPI.Devices.Features.Repository;

using MediatR;

namespace Device_ManagementAPI.Devices.Features.CommandOrder.Handler
{
    public class DeleteOrderCommandHandler : IRequestHandler<DeleteOrderCommand, bool>
    {
        private readonly IOrderRepository _orderRepository;

        public DeleteOrderCommandHandler(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }
        public async Task<bool> Handle(DeleteOrderCommand request, CancellationToken cancellationToken)
        {
            return await _orderRepository.DeleteOrderAsync(request.OrderId);
        }
    }
}
