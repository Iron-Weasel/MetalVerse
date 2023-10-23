using MetalVerseBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace MetalVerseBackend.Controllers
{
    [ApiController]
    [Route("users")]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok();
        }

        [HttpGet("{userId}")]
        public IActionResult GetUser(Guid userId)
        {
            return Ok();
        }

        [HttpPost("add_user")]
        public IActionResult AdUser(User user)
        {
            return Ok();
        }
    }
}
