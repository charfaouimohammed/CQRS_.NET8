using Device_ManagementAPI.Models;
using MediatR;

namespace Device_ManagementAPI.Devices.UserQueris
{
    public class GetAllUsersQuery : IRequest<List<User>>
    {
    }
}
