using Device_ManagementAPI.Models;
using MediatR;
using MongoDB.Bson.Serialization.Attributes;

namespace Device_ManagementAPI.Dto
{
    public class UserDto : IRequest<User>
    {
        public string Id { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
