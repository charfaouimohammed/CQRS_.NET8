using Device_ManagementAPI.Devices.Features.Queries;
using Device_ManagementAPI.Devices.Features.Repository;
using Device_ManagementAPI.Models;
using Device_ManagementAPI.Settings;
using MediatR;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Device_ManagementAPI.Devices.Features.OrderHandler
{
    public class GetOrdersByUserQueryHandler : IRequestHandler<GetOrdersByUserQuery, List<Order>>
    {
        private readonly IMongoCollection<Order> _orders;

        // Constructor with dependency injection of MongoDB settings
        public GetOrdersByUserQueryHandler(IOptions<MongoDbSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _orders = database.GetCollection<Order>("Orders");
        }

        public async Task<List<Order>> Handle(GetOrdersByUserQuery request, CancellationToken cancellationToken)
        {
            // Fetch orders by UserId
            return await _orders.Find(order => order.UserId == request.UserId)
                                .ToListAsync(cancellationToken);
        }
    }
}
