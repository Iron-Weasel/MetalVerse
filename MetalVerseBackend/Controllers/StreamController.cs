using Microsoft.AspNetCore.Mvc;
using MetalVerseBackend.Models;

namespace MetalVerseBackend.Controllers
{
    [ApiController]
    [Route("stream")]
    public class StreamController : ControllerBase
    {
        private List<RockStream> _streams = new List<RockStream>();

        public StreamController()
        {
            _streams.Add(new RockStream()
            {
                Id = Guid.NewGuid(),
                Name = "Rock FM",
                ApiLink = "the api of rock fm romania",
                Image = "Sorry but they will ask for copyrights"
            });

            _streams.Add(new RockStream()
            {
                Id = Guid.NewGuid(),
                Name = "Rock Antenne Biker Rock",
                ApiLink = "My favorite rock api",
                Image = "Sorry but they will ask for copyrights"
            });
        }

        [HttpGet]
        public IActionResult GetStreams()
        {
            return Ok(_streams);
        }

        [HttpGet("{streamId}")]
        public IActionResult GetStream(Guid streamId)
        {
            return Ok(_streams.FirstOrDefault(x => x.Id == streamId));
        }

        [HttpPost("add_stream")]
        public IActionResult AddStream(RockStream stream)
        {
            _streams.Add(stream);
            return Ok(_streams);
        }

        [HttpGet("search_result")]
        public IActionResult GetResultsBySearch([FromQuery] string search)
        {
            var streamsResult = _streams.Where(s => s.Name.Contains(search)).ToList();
            if (streamsResult.Count != 0)
            {
                return Ok(streamsResult);
            }
            else return NotFound();
        }
    }
}
