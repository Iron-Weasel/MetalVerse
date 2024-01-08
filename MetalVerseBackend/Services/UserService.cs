using MetalVerseBackend.Interfaces;
using MetalVerseBackend.Interfaces.Repositories;
using MetalVerseBackend.Models;
using MetalVerseBackend.Models.Dtos;

namespace MetalVerseBackend.Services
{
    public class UserService : IUserService
    {
        private readonly IRepositoryManager _repository;

        public UserService(IRepositoryManager repository)
        {
            _repository = repository;
        }
        public async Task AddUser(User user)
        {
            user.Id = Guid.NewGuid();
            _repository.Users.CreateUser(user);
            await _repository.Save();
        }

        public User GetUser(Guid userId)
        {
            return _repository.Users.GetUser(userId);
        }

        public List<User> GetUsers()
        {
            return _repository.Users.GetUsers(false).ToList();
        }

        public User GetUserByString(string username)
        {
            return _repository.Users.GetUsersByString(username, false).FirstOrDefault();
        }
    }
}
