using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Device_ManagementAPI.Models
{
    public class Order
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } // MongoDB-generated unique ID for each order

        [BsonElement("UserId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; } // Reference to the User who made the order

        [BsonElement("Devices")]
        public List<Device> Devices { get; set; } = new List<Device>(); // List of devices in the order

        [BsonElement("OrderDate")]
        public DateTime OrderDate { get; set; } = DateTime.Now; // Date when the order was placed

        [BsonElement("TotalPrice")]
        public decimal TotalPrice { get; set; } // Total price of all devices in the order

        [BsonElement("OrderStatus")]
        public string OrderStatus { get; set; } = "Pending"; // Status of the order (e.g., Pending, Completed)

        [BsonElement("Comments")]
        public string Comments { get; set; } = string.Empty; // Optional comments or instructions for the order
        public DateTime DateOfCommand { get; internal set; }
        public string Departement { get; internal set; }
    }
}
