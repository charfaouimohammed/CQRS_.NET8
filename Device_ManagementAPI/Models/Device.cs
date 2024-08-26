using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Device_ManagementAPI.Models
{
    public class Device
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } // This maps to the MongoDB _id field

        [BsonElement("DeviceID")]
        public int DeviceID { get; set; }

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
