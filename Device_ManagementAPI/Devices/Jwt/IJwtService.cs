using Device_ManagementAPI.Models;

namespace Device_ManagementAPI.Devices.Jwt
{
    public interface IJwtService
    {
        string GenerateToken(User user);
    }
}
