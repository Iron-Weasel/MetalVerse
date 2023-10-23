using MetalVerseBackend.Models;

namespace MetalVerseBackend.Interfaces
{
    public interface ISigningService
    {
        void RegiserUser(User user); // add a new user
        void LoginUser(string username, string password);
    }
}
