using MetalVerseBackend.Interfaces.Repositories;
using MetalVerseBackend.Models;
using MetalVerseBackend.Models.Dtos;

namespace MetalVerseBackend.Interfaces
{
    public interface ISigningService
    {
        Task RegisterUser(User user);
        bool ValidateUser(LoginUser attempt);
    }
}
