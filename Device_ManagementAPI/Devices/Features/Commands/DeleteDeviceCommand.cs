using MediatR;

namespace Device_ManagementAPI.Devices.Features.Commands
{
    public class DeleteDeviceCommand : IRequest<bool>
    {
        public int DeviceID { get; set; }
    }

}
