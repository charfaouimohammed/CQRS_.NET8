using Device_ManagementAPI.Devices.Features.OrderCommands;
using Device_ManagementAPI.Devices.Features.OrderHandler;
using Device_ManagementAPI.Devices.Features.Queries;
using Device_ManagementAPI.Devices.Features.Repository;
using Device_ManagementAPI.Dto;
using Device_ManagementAPI.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Device_ManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMediator _mediator;

        public OrderController(IMediator mediator, IOrderRepository orderRepository)
        {
            _mediator = mediator;
            _orderRepository = orderRepository;
        }
             [HttpGet]
        public async Task<ActionResult<List<Order>>> GetAllOrders()
        {
            var orders = await _orderRepository.GetAllOrdersAsync();
            if (orders == null || orders.Count == 0)
            {
                return NotFound("No orders found.");
            }
            return Ok(orders);
        }
        // GET: api/Order/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<List<Order>>> GetOrdersByUser(string userId)
        {
            var query = new GetOrdersByUserQuery { UserId = userId };
            var orders = await _mediator.Send(query);

            if (orders == null || !orders.Any())
                return NotFound("No orders found for the user.");

            return Ok(orders);
        }

        // POST: api/Order
        [HttpPost]
        public async Task<ActionResult> CreateOrder([FromBody] CreateOrderCommand command)
        {
            var result = await _mediator.Send(command);

            if (!result)
                return BadRequest("Failed to create the order.");

            return Ok("Order created successfully.");
        }

        // PUT: api/Order/{orderId}
        //[HttpPut("{orderId}")]
        //public async Task<ActionResult> UpdateOrder(string orderId, [FromBody] UpdateOrderCommad command)
        //{
        //    if (orderId != command.OrderId)
        //        return BadRequest("Order ID mismatch.");

        //    var result = await _mediator.Send(command);

        //    if (!result)
        //        return NotFound("Order not found or update failed.");

        //    return Ok("Order updated successfully.");
        //}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(string id, [FromBody] UpdateOrderDto orderDto)
        {
            if (id != orderDto.Id)
            {
                return BadRequest("Order ID mismatch");
            }

            var command = new UpdateOrderCommand(orderDto);
            var result = await _mediator.Send(command);

            if (result)
            {
                return NoContent(); // Successful update
            }
            return NotFound(); // Order not found
        }

    // DELETE: api/Order/{orderId}
    [HttpDelete("{orderId}")]
        public async Task<ActionResult> DeleteOrder(string orderId)
        {
            var command = new DeleteOrderCommand { OrderId = orderId };
            var result = await _mediator.Send(command);

            if (!result)
                return NotFound("Order not found or deletion failed.");

            return Ok("Order deleted successfully.");
        }
        // GET: api/Order/details/{orderId}
        [HttpGet("details/{orderId}")]
        public async Task<ActionResult<OrderDetailsDto>> GetOrderDetails(string orderId)
        {
            var query = new GetOrderDetailsQuery { OrderId = orderId };
            var orderDetails = await _mediator.Send(query);

            if (orderDetails == null)
                return NotFound("Order or user details not found.");

            return Ok(orderDetails);
        }
    }
}
