using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Device_ManagementAPI.Models
{
    public class User
    {
        [BsonRepresentation(BsonType.ObjectId)] // Ensures ObjectId is correctly serialized/deserialized
        public string Id { get; set; } = string.Empty;
        public string Firstname { get; set; } = string.Empty;
        public string Lastname { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
