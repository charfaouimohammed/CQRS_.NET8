using Device_ManagementAPI.Models;

namespace Device_ManagementAPI.Devices.Features.Repository
{
    public interface IOrderRepository
    {
        Task<Order?> GetOrderByIdAsync(string orderId);
        Task<List<Order>> GetAllOrdersAsync();
        Task CreateOrderAsync(Order order);
        Task<bool> UpdateOrderAsync(Order order);
        Task<bool> DeleteOrderAsync(string orderId);
       
    }
}
