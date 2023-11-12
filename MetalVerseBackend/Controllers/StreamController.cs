using Microsoft.AspNetCore.Mvc;
using MetalVerseBackend.Models;
using MetalVerseBackend.Interfaces.Repositories;

namespace MetalVerseBackend.Controllers
{
    [ApiController]
    [Route("stream")]
    public class StreamController : ControllerBase
    {
        //private List<RockStream> _streams = new List<RockStream>();

        private readonly IRepositoryManager _repository;

        public StreamController(IRepositoryManager repository)
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
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetStreams()
        {
            var _streams = _repository.Streams.GetRockStreams(false).ToList();
            return Ok(_streams);
        }

        [HttpGet("{streamId}")]
        public IActionResult GetStream(Guid streamId)
        {
            var _stream = _repository.Streams.GetRockStream(streamId);
            return Ok(_stream);
        }

        [HttpPost("add_stream")]
        public IActionResult AddStream(RockStream stream)
        {
            _repository.Streams.CreateStream(stream);
            _repository.Save();
            return Ok();
        }
        

        [HttpGet("search_result")]
        public IActionResult GetResultsBySearch([FromQuery] string search)
        {
            var _streams = _repository.Streams.GetRockStreamsByString( search, false).ToList();
            return _streams.Count != 0 ? Ok(_streams) : NotFound();
        }
    }
}
