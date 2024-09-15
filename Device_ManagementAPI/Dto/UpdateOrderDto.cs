using Device_ManagementAPI.Models;

namespace Device_ManagementAPI.Dto
{
    public class UpdateOrderDto
    {
        public string Id { get; set; } // Order ID to be updated
        //public List<Device> Devices { get; set; } = new List<Device>(); // Updated list of devices
        public DateTime OrderDate { get; set; } // Updated order date
        public string Comments { get; set; } = string.Empty; // Optional comments
    }
}
