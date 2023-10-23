using MetalVerseBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace MetalVerseBackend.Controllers
{
    [ApiController]
    [Route("events")]
    public class FutureEventsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetEvents()
        {
            return Ok();
        }

        [HttpGet("{eventId}")]
        public IActionResult GetUser(Guid eventId)
        {
            return Ok();
        }

        [HttpPost("add_event")]
        public IActionResult AddEvent(FutureEvent concert)
        {
            return Ok();
        }
    }
}
