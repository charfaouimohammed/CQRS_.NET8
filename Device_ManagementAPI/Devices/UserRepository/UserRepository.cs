using Device_ManagementAPI.Models;
using Device_ManagementAPI.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Device_ManagementAPI.Devices.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _users;

        public UserRepository(IOptions<MongoDbSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _users = database.GetCollection<User>("Users");
        }

        public async Task<User?> GetUserByUsernameAsync(string username)
        {
            return await _users.Find(u => u.Username == username).FirstOrDefaultAsync();
        }

        public async Task<List<User>> GetAllUsersAsync()
        {

            return await _users.Find(_ => true).ToListAsync();
        }
       
        public async Task<User?> GetUserByIdAsync(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return null; // Invalid ID format
            }
            return await _users.Find(u => u.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateUserAsync(User user)
        {
            await _users.InsertOneAsync(user);
        }

        public async Task<bool> UpdateUserAsync(User user)
        {
            var result = await _users.ReplaceOneAsync(u => u.Id == user.Id, user);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteUserAsync(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return false; // Invalid ID format
            }
            var result = await _users.DeleteOneAsync(u => u.Id == id);
            return result.IsAcknowledged && result.DeletedCount > 0;
        }
    }
}
