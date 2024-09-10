using Device_ManagementAPI.Devices.Features.Repository;
using Device_ManagementAPI.Dto;
using MediatR;

namespace Device_ManagementAPI.Devices.Features.OrderHandler
{
    public class GetOrderDetailsQueryHandler : IRequestHandler<GetOrderDetailsQuery, OrderDetailsDto>
        {
            private readonly IOrderRepository _orderRepository;
            private readonly IUserRepository _userRepository; // Assuming you have a User repository

            public GetOrderDetailsQueryHandler(IOrderRepository orderRepository, IUserRepository userRepository)
            {
                _orderRepository = orderRepository;
                _userRepository = userRepository;
            }

            public async Task<OrderDetailsDto> Handle(GetOrderDetailsQuery request, CancellationToken cancellationToken)
            {
                // Fetch the order
                var order = await _orderRepository.GetOrderByIdAsync(request.OrderId);
                if (order == null) return null;

                // Fetch the user
                var user = await _userRepository.GetUserByIdAsync(order.UserId);
                if (user == null) return null;

                // Map order and user data to DTO
                var orderDetails = new OrderDetailsDto
                {
                    OrderId = order.Id,
                    Username = user.Username,
                    Author = $"{user.Firstname} {user.Lastname}", // Assuming 'Author' is the combination of firstname and lastname
                    OrderDate = order.OrderDate,
                    TotalPrice = order.TotalPrice,
                    OrderStatus = order.OrderStatus,
                    Comments = order.Comments,
                    DateOfCommand = order.DateOfCommand,
                    Departement = order.Departement
                };

                return orderDetails;
            }
        }
    
}
