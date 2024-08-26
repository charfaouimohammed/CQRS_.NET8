using Device_ManagementAPI.Models;
using MediatR;

namespace Device_ManagementAPI.Devices.Features.Queries
{
    public class GetDeviceByIdQuery : IRequest<Device>
    {
        public int DeviceID { get; set; }
    }

}
