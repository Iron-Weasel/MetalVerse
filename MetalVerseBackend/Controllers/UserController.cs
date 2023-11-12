using MetalVerseBackend.Interfaces;
using MetalVerseBackend.Interfaces.Repositories;
using MetalVerseBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace MetalVerseBackend.Controllers
{
    [ApiController]
    [Route("users")]
    public class UserController : ControllerBase
    {
        //private List<User> _users = new List<User>();
        private readonly IRepositoryManager _repository;
        public UserController(IRepositoryManager repository)
        {
            /*_users.Add(new User()
            {
                Id = Guid.Parse("5d899972-6bfa-413d-bfa7-619fcfcd2706"),
                FirstName = "A",
                LastName = "B",
                Email = "C",
                Password = "D",
                UserRole = UserRoles.BandMember
            });

            _users.Add(new User()
            {
                Id = Guid.Parse("67db0b44-fed7-49eb-9fa5-d291fe9cde64"),
                FirstName = "X",
                LastName = "Y",
                Email = "Z",
                Password = "V",
                UserRole = UserRoles.StudioManager
            });
            */
            _repository = repository;
        }
        [HttpGet]
        public IActionResult GetUsers()
        {
            var _users = _repository.Users.GetUsers(false);
            return Ok(_users);
        }

        [HttpGet("{userId}")]
        public IActionResult GetUser(Guid userId)
        {
            var _user = _repository.Users.GetUser(userId);
            return Ok(_user);
        }

        [HttpPost("add_user")]
        public IActionResult AdUser(User user)
        {
            _repository.Users.CreateUser(user);
            _repository.Save();
            return Ok();
        }
    }
}
