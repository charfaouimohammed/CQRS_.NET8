using Device_ManagementAPI.Models;
using MediatR;

namespace Device_ManagementAPI.Devices.Features.Commands
{
    public class CreateDeviceCommand : IRequest<Device>
    {
        public string DeviceName { get; set; }
        public string Manufacturer { get; set; }
        public string DeviceType { get; set; }
        public string OS { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string SerialNumber { get; set; }
        public string WarrantyStatus { get; set; }
        public DateTime PurchaseDate { get; set; }
        public decimal Price { get; set; }
        public string Location { get; set; }
        public string Owner { get; set; }
        public string Status { get; set; }
    }

}
