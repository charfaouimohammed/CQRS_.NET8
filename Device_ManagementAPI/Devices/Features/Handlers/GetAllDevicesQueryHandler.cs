using Device_ManagementAPI.Devices.Features.Queries;
using Device_ManagementAPI.Models;
using Device_ManagementAPI.Settings;
using MediatR;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Device_ManagementAPI.Devices.Features.Handlers
{
    public class GetAllDevicesQueryHandler : IRequestHandler<GetAllDevicesQuery, List<Device>>
    {
        private readonly IMongoCollection<Device> _deviceCollection;

        public GetAllDevicesQueryHandler(IOptions<MongoDbSettings> mongoDbSettings)
        {
            var client = new MongoClient(mongoDbSettings.Value.ConnectionString);
            var database = client.GetDatabase(mongoDbSettings.Value.DatabaseName);
            _deviceCollection = database.GetCollection<Device>("Devices");
        }

        public async Task<List<Device>> Handle(GetAllDevicesQuery request, CancellationToken cancellationToken)
        {
            return await _deviceCollection.Find(_ => true).ToListAsync();
        }
    }

}
