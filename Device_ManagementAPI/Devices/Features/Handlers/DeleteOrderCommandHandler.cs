using Amazon.Runtime.Internal;
using Device_ManagementAPI.Devices.Features.OrderCommands;
using Device_ManagementAPI.Devices.Features.Repository;
using Device_ManagementAPI.Devices.UserCommand;
using MediatR;

namespace Device_ManagementAPI.Devices.Features.OrderHandler
{
    public class DeleteOrderCommandHandler : IRequestHandler<DeleteOrderCommand,bool>
    {
        private readonly IOrderRepository _orderRepository;

        public DeleteOrderCommandHandler(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }
        public async Task<bool> Handle(DeleteOrderCommand request,CancellationToken cancellationToken)
        {
            return await _orderRepository.DeleteOrderAsync(request.OrderId);  
        }
    }
}
