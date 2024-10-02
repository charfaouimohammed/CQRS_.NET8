using Device_ManagementAPI.Models;
using MediatR;
using MongoDB.Bson.Serialization.Attributes;

namespace Device_ManagementAPI.Dto
{
    public class OrderDetailsDto
    {
        public string OrderId { get; set; }
        public string Username { get; set; }
        //public string Author { get; set; } // Assuming 'Author' is another user field; adjust as needed
        public DateTime OrderDate { get; set; }
        //public decimal TotalPrice { get; set; }
        //public string OrderStatus { get; set; }
        public string Comments { get; set; }
        //public DateTime DateOfCommand { get; set; }
        //public string Departement { get; set; }
    }
}
