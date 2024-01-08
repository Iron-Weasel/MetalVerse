using MetalVerseBackend.Models;
using MetalVerseBackend.Models.Dtos;

namespace MetalVerseBackend.Interfaces
{
    public interface IUserService
    {
        List<User> GetUsers();
        User GetUser(Guid userId);
        User GetUserByString(string username);
    }
}
