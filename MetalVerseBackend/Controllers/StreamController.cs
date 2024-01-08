using Microsoft.AspNetCore.Mvc;
using MetalVerseBackend.Models;
using MetalVerseBackend.Interfaces.Repositories;
using MetalVerseBackend.Interfaces;

namespace MetalVerseBackend.Controllers
{
    [ApiController]
    [Route("stream")]
    public class StreamController : ControllerBase
    {
        //private List<RockStream> _streams = new List<RockStream>();

        private readonly IStreamService _service;

        public StreamController(IStreamService service)
        {
            /*_streams.Add(new RockStream()
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
            });*/
            _service = service;
        }

        [HttpGet]
        public IActionResult GetStreams()
        {
            var _streams =_service.GetStreams();
            return Ok(_streams);
        }

        [HttpGet("{streamId}")]
        public IActionResult GetStream(Guid streamId)
        {
            var _stream = _service.GetStream(streamId);
            return Ok(_stream);
        }

        [HttpPost("add_stream")]
        public async Task<IActionResult> AddStream(RockStream stream)
        {
            await _service.AddStream(stream);
            return Ok();
        }
        
        [HttpGet("search_result")]
        public IActionResult GetResultsBySearch([FromQuery] string search)
        {
            var _streams = _service.GetStreamsBySearch(search);
            return _streams.Count != 0 ? Ok(_streams) : Ok();
        }

        [HttpGet("metadata")]
        public async Task<IActionResult> GetMetadata(Guid streamId)
        {
            var _streamMetadata = await _service.GetStreamMetadata(streamId);
            return Ok(_streamMetadata);
        }
    }
}
