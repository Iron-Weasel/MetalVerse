using MetalVerseBackend.Interfaces;
using MetalVerseBackend.Interfaces.Repositories;
using MetalVerseBackend.Models;
using MetalVerseBackend.Models.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MetalVerseBackend.Controllers
{
    [ApiController]
    [Route("users")]
    public class UserController : ControllerBase
    {
        //private List<User> _users = new List<User>();
        private readonly IUserService _service;
        public UserController(IUserService service)
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

         nm    _users.Add(new User()
            {
                Id = Guid.Parse("67db0b44-fed7-49eb-9fa5-d291fe9cde64"),
                FirstName = "X",
                LastName = "Y",
                Email = "Z",
                Password = "V",
                UserRole = UserRoles.StudioManager
            });
            */
            _service = service;
        }
        [HttpGet]
        public IActionResult GetUsers()
        {
            var _users = _service.GetUsers();
            return Ok(_users);
        }

        [HttpGet("{userId}")]
        public IActionResult GetUser(Guid userId)
        {
            var _user = _service.GetUser(userId);
            return Ok(_user);
        }

        [HttpPost("add_user")]
        public async Task<IActionResult> AddUser(User user)
        {
            await _service.AddUser(user);
            return Ok();
        }

        [HttpPost("login")]
        public IActionResult Login([FromForm] LoginUser user)
        {
            if (user is null)
            {
                return BadRequest("Invalid client request");
            }
            if (_service.ValidateUser(user))
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("KE1Z94B4i0N9mK/FvFDOZbOYHRNnWXLAq8vSIPbnxEzk/0ax109JdlwmEO6bQK2iUf+Dk7Mu2J4RZSryzhZHw8dKf2jQnq2G1h/Qbynz0Iyne72iio0UXGTGdAQz/EX0wYWv/mzlmwIASHlJB1i7IaQSTaE3SlH0h609Rs1IdOg8GC8zGfnk+LNbnVBzQWFBYMIoaOFp5AL8iggVrsLk2SoSQS6a1XJQJjDlg/XhswCZ03cs0nKn6c6B03QLR6hzupAQ/9VOBQCO9xtlwLt9n7s7mWUBTB8UBNescnE53Rqc/QJ4SvcN2ToDysRfrTRndiSajwWI4HqhTa/BmQO/NhOoioWYuMOoc3CZduOAA1U=\r\n"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: "https://localhost:5001",
                    audience: "https://localhost:5001",
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddHours(1),
                    signingCredentials: signinCredentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new AuthenticatedResponse { Token = tokenString });
            }
            return Unauthorized();
        }
    }
}
