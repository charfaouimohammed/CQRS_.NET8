using Device_ManagementAPI.Devices.Features.Commands;
using Device_ManagementAPI.Models;
using Device_ManagementAPI.Settings;
using MediatR;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Device_ManagementAPI.Devices.Features.CommandDevice.Handler
{
    public class DeleteDeviceCommandHandler : IRequestHandler<DeleteDeviceCommand, bool>
    {
        private readonly IMongoCollection<Device> _deviceCollection;

        public DeleteDeviceCommandHandler(IOptions<MongoDbSettings> mongoDbSettings)
        {
            var client = new MongoClient(mongoDbSettings.Value.ConnectionString);
            var database = client.GetDatabase(mongoDbSettings.Value.DatabaseName);
            _deviceCollection = database.GetCollection<Device>("Devices");
        }

        public async Task<bool> Handle(DeleteDeviceCommand request, CancellationToken cancellationToken)
        {
            var result = await _deviceCollection.DeleteOneAsync(d => d.DeviceID == request.DeviceID);

            return result.DeletedCount > 0;
        }
    }

}
