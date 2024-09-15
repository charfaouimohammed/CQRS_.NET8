using Device_ManagementAPI.Devices.Features.OrderCommands;
using Device_ManagementAPI.Devices.Features.Repository;
using Device_ManagementAPI.Models;
using MediatR;
using System.Formats.Asn1;

namespace Device_ManagementAPI.Devices.Features.OrderHandler
{
    public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, bool>
    {
        private readonly IOrderRepository _orderRepository;

        public CreateOrderCommandHandler(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;

        }
             public async Task<bool> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
             {
                  var order = new Order
                {
                    UserId = request.UserId,
                    Devices = request.Devices,
                    OrderDate = DateTime.Now,
                    //TotalPrice = request.Devices.Sum(d => d.Price),
                    Comments = request.Comments
                };
    
                await _orderRepository.CreateOrderAsync(order);
                return true;
             }
    }
}
