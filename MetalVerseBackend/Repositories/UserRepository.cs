using MetalVerseBackend.Data;
using MetalVerseBackend.Interfaces.Repositories;
using MetalVerseBackend.Models;

namespace MetalVerseBackend.Repositories
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(ApplicationDbContext _ApplicationDbContext) : base(_ApplicationDbContext) { }

        public void CreateUser(User user) => Create(user);

        public User GetUser(Guid userId) => FindByCondition(x => x.Id == userId, false).First();

        public IEnumerable<User> GetUsers(bool trackChanges) => FindAll(trackChanges).ToList();

        public IEnumerable<User> GetUsersByString(string search, bool trackChanges) => FindByCondition(x => x.Username.Contains(search), trackChanges).ToList();
    }
}
