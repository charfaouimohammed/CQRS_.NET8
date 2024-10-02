using Device_ManagementAPI.Models;

namespace Device_ManagementAPI.Devices.Features.Repository
{
    public interface IUserRepository
    {
        
        Task<User?> GetUserByUsernameAsync(string username);
        Task<List<User>> GetAllUsersAsync();
        Task<User?> GetUserByIdAsync(string id);
        Task CreateUserAsync(User user);
        Task<bool> UpdateUserAsync(User user);
        Task<bool> DeleteUserAsync(string id);
    }
}
