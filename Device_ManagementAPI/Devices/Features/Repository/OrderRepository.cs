using Device_ManagementAPI.Models;
using Device_ManagementAPI.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Device_ManagementAPI.Devices.Features.Repository
{
    public class OrderRepository: IOrderRepository
    {
        private readonly  IMongoCollection<Order> _orders;

        public OrderRepository(IOptions<MongoDbSettings> settings)
        {
            var client =new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _orders = database.GetCollection<Order>("Orders");
        }

        async Task<Order?> IOrderRepository.GetOrderByIdAsync(string orderId)
        {
            if(!ObjectId.TryParse(orderId,out var id))
            {
                return null;
            }
            return await _orders.Find(o => o.Id == orderId).FirstOrDefaultAsync();  
        }
        async Task<List<Order>> IOrderRepository.GetAllOrdersAsync()
        {
            return await _orders.Find(_ =>true).ToListAsync();
        }

        async Task IOrderRepository.CreateOrderAsync(Order order)
        {
            await _orders.InsertOneAsync(order);
        }
        async Task<bool> IOrderRepository.UpdateOrderAsync(Order order)
        {
                var result = await _orders.ReplaceOneAsync(o => o.Id == order.Id,order);
               return result.IsAcknowledged && result.ModifiedCount>0;
        }
        async Task<bool> IOrderRepository.DeleteOrderAsync(string orderId)
        {
            if (!ObjectId.TryParse(orderId, out var id))
            {
                return false;
            }
            var result =await _orders.DeleteOneAsync(o => o.Id == orderId);
            return result.IsAcknowledged && result.DeletedCount>0;
        }
        public async Task<Order> GetOrderByIdAsync(string orderId)
        {
            var filter = Builders<Order>.Filter.Eq(o => o.Id, orderId);
            return await _orders.Find(filter).FirstOrDefaultAsync();
        }

    }
}
