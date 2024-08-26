using Device_ManagementAPI.Models;
using MediatR;

namespace Device_ManagementAPI.Devices.Features.Queries
{
    public class GetAllDevicesQuery : IRequest<List<Device>>
    {
    }

}
