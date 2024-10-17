using Device_ManagementAPI.Devices.Features.Commands;
using Device_ManagementAPI.Models;
using Device_ManagementAPI.Settings;
using MediatR;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Device_ManagementAPI.Devices.Features.CommandDevice.Handler
{
    public class CreateDeviceCommandHandler : IRequestHandler<CreateDeviceCommand, Device>
    {
        private readonly IMongoCollection<Device> _deviceCollection;

        public CreateDeviceCommandHandler(IOptions<MongoDbSettings> mongoDbSettings)
        {
            var client = new MongoClient(mongoDbSettings.Value.ConnectionString);
            var database = client.GetDatabase(mongoDbSettings.Value.DatabaseName);
            _deviceCollection = database.GetCollection<Device>("Devices");
        }

        public async Task<Device> Handle(CreateDeviceCommand request, CancellationToken cancellationToken)
        {
            var maxDeviceId = await _deviceCollection.Find(_ => true)
                .SortByDescending(d => d.DeviceID)
                .Limit(1)
                .FirstOrDefaultAsync();

            var newDeviceId = maxDeviceId != null ? maxDeviceId.DeviceID + 1 : 1;

            var newDevice = new Device
            {
                DeviceID = newDeviceId,
                DeviceName = request.DeviceName,
                Manufacturer = request.Manufacturer,
                DeviceType = request.DeviceType,
                OS = request.OS,
                ReleaseDate = request.ReleaseDate,
                SerialNumber = request.SerialNumber,
                WarrantyStatus = request.WarrantyStatus,
                PurchaseDate = request.PurchaseDate,
                Price = request.Price,
                Location = request.Location,
                Owner = request.Owner,
                Status = request.Status
            };

            await _deviceCollection.InsertOneAsync(newDevice);

            return newDevice;
        }
    }

}
