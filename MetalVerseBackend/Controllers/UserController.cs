using MetalVerseBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace MetalVerseBackend.Controllers
{
    [ApiController]
    [Route("users")]
    public class UserController : ControllerBase
    {
        private List<User> _users = new List<User>();
        public UserController()
        {
            _users.Add(new User()
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

        }
        [HttpGet]
        public IActionResult GetUsers()
        {
            var users = _users.ToList();
            return Ok(users);
        }

        [HttpGet("{userId}")]
        public IActionResult GetUser(Guid userId)
        {
            var user = _users.FirstOrDefault(x => x.Id == userId);
            return Ok(user);
        }

        [HttpPost("add_user")]
        public IActionResult AdUser(User user)
        {
            _users.Add(user);
            return Ok(_users);
        }
    }
}
