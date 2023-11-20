using MetalVerseBackend.Interfaces;
using MetalVerseBackend.Interfaces.Repositories;
using MetalVerseBackend.Models;

namespace MetalVerseBackend.Services
{
    public class UserService : IUserService
    {
        private readonly IRepositoryManager _repository;

        public UserService(IRepositoryManager repository)
        {
            _repository = repository;
        }
        public void AddUser(User user)
        {
            user.Id = Guid.NewGuid();
            _repository.Users.CreateUser(user);
            _repository.Save();
        }

        public User GetUser(Guid userId)
        {
            return _repository.Users.GetUser(userId);
        }

        public List<User> GetUsers()
        {
            return _repository.Users.GetUsers(false).ToList();
        }
    }
}
