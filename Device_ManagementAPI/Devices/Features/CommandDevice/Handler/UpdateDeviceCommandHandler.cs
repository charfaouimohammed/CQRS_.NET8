using Device_ManagementAPI.Devices.Features.Commands;
using Device_ManagementAPI.Models;
using Device_ManagementAPI.Settings;
using MediatR;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Device_ManagementAPI.Devices.Features.CommandDevice.Handler
{
    public class UpdateDeviceCommandHandler : IRequestHandler<UpdateDeviceCommand, Device>
    {
        private readonly IMongoCollection<Device> _deviceCollection;

        public UpdateDeviceCommandHandler(IOptions<MongoDbSettings> mongoDbSettings)
        {
            var client = new MongoClient(mongoDbSettings.Value.ConnectionString);
            var database = client.GetDatabase(mongoDbSettings.Value.DatabaseName);
            _deviceCollection = database.GetCollection<Device>("Devices");
        }

        public async Task<Device> Handle(UpdateDeviceCommand request, CancellationToken cancellationToken)
        {
            var device = await _deviceCollection.Find(d => d.DeviceID == request.DeviceID).FirstOrDefaultAsync();

            if (device == null) return null;

            device.DeviceName = request.DeviceName;
            device.Manufacturer = request.Manufacturer;
            device.DeviceType = request.DeviceType;
            device.OS = request.OS;
            device.ReleaseDate = request.ReleaseDate;
            device.SerialNumber = request.SerialNumber;
            device.WarrantyStatus = request.WarrantyStatus;
            device.PurchaseDate = request.PurchaseDate;
            device.Price = request.Price;
            device.Location = request.Location;
            device.Owner = request.Owner;
            device.Status = request.Status;

            await _deviceCollection.ReplaceOneAsync(d => d.DeviceID == request.DeviceID, device);

            return await _deviceCollection.Find(d => d.DeviceID == request.DeviceID).FirstOrDefaultAsync(); ;
        }
    }

}
