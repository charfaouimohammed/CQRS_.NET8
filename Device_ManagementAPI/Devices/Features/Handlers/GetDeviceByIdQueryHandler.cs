using Device_ManagementAPI.Devices.Features.Queries;
using Device_ManagementAPI.Models;
using Device_ManagementAPI.Settings;
using MediatR;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Device_ManagementAPI.Devices.Features.Handlers
{
    public class GetDeviceByIdQueryHandler : IRequestHandler<GetDeviceByIdQuery, Device>
    {
        private readonly IMongoCollection<Device> _deviceCollection;

        public GetDeviceByIdQueryHandler(IOptions<MongoDbSettings> mongoDbSettings)
        {
            var client = new MongoClient(mongoDbSettings.Value.ConnectionString);
            var database = client.GetDatabase(mongoDbSettings.Value.DatabaseName);
            _deviceCollection = database.GetCollection<Device>("Devices");
        }

        public async Task<Device> Handle(GetDeviceByIdQuery request, CancellationToken cancellationToken)
        {
            return await _deviceCollection.Find(d => d.DeviceID == request.DeviceID).FirstOrDefaultAsync();
        }
    }

}
