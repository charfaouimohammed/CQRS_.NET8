using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Device_ManagementAPI.Dto
{
    public class GetAllDevicesDto
    {
        public string Id { get; set; } 
        public int DeviceID { get; set; }
        public string DeviceName { get; set; }
        public string FullName { get; set; }
        public string Manufacturer { get; set; }
        public string DeviceType { get; set; }
        public string OS { get; set; }
        public string ReleaseDate { get; set; }
        public string SerialNumber { get; set; }
        public string WarrantyStatus { get; set; }
        public string PurchaseDate { get; set; }
        public decimal Price { get; set; }
        public string Location { get; set; }
        public string Owner { get; set; }
        public string Status { get; set; }

    }
}
