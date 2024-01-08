using MetalVerseBackend.Interfaces;
using MetalVerseBackend.Interfaces.Repositories;
using MetalVerseBackend.Models;
using MetalVerseBackend.Models.Dtos;

namespace MetalVerseBackend.Services
{
    public class SigningService : ISigningService
    {
        private readonly IRepositoryManager _repository;
        public SigningService(IRepositoryManager repository) 
        { 
            _repository = repository;
        }

        public async Task RegisterUser(User user)
        {
            throw new NotImplementedException();
        }

        public bool ValidateUser(LoginUser attempt)
        {
            var found = _repository.Users.GetUsersByString(attempt.Username, false).FirstOrDefault();
            if (found == null)
            {
                return false;
            }

            var passwordCheck = found.Password == attempt.Password;
            if (!passwordCheck)
            {
                return false;
            }

            return true;
        }
    }
}
