using Amazon.Runtime.Internal;
using Device_ManagementAPI.Models;
using MediatR;

namespace Device_ManagementAPI.Devices.Features.CommandOrder
{
    public class CreateOrderCommand : IRequest<bool>
    {
        public string UserId { get; set; }
        public List<Device> Devices { get; set; }
        //chek out 
        public DateTime OrderDate { get; set; }
        public string Comments { get; set; }
    }
}
