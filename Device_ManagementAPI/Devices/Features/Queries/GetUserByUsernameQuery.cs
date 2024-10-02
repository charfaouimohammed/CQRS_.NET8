using Device_ManagementAPI.Models;
using MediatR;

namespace Device_ManagementAPI.Devices.UserQueris
{
    public class GetUserByUsernameQuery : IRequest<User?>
    {
        public string Username { get; set; }
        public GetUserByUsernameQuery(string username)
        {
            Username = username;
        }
    }
}
