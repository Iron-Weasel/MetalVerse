using MetalVerseBackend.Models;

namespace MetalVerseBackend.Interfaces
{
    public interface IUserService
    {
        List<User> GetUsers();
        User GetUser(Guid userId);
        void AddUser(User user);
    }
}
