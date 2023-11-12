using MetalVerseBackend.Interfaces.Repositories;
using MetalVerseBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace MetalVerseBackend.Controllers
{
    [ApiController]
    [Route("events")]
    public class FutureEventsController : ControllerBase
    {
        //private List<FutureEvent> _events = new List<FutureEvent>();
        private readonly IRepositoryManager _repository;
        public FutureEventsController(IRepositoryManager repository) 
        {
        /*    _events.Add(new FutureEvent()
            {
                Id = Guid.Parse("5d899972-6bfa-413d-bfa7-619fcfcd2706"),
                BandCountry = "USA",
                Title = "Title",
                ImageURL = "",
                BandGenre = "Grunge",
                Country = "Germany",
                City = "Berlin",
                VenueName = "AAAA",
                FacebookPage = "",
                TicketPurchasePage = ""

            });

            _events.Add(new FutureEvent()
            {
                Id = Guid.Parse("67db0b44-fed7-49eb-9fa5-d291fe9cde64"),
                BandCountry = "Sweden",
                Title = "Title",
                ImageURL = "",
                BandGenre = "Black Metal",
                Country = "Germany",
                City = "Berlin",
                VenueName = "AAAAAAAA",
                FacebookPage = "",
                TicketPurchasePage = ""

            });*/
            _repository = repository;
        }
        [HttpGet]
        public IActionResult GetEvents()
        {
            var _events = _repository.FutureEvents.GetFutureEvents(false).ToList();
            return Ok(_events);
        }

        [HttpGet("{eventId}")]
        public IActionResult GetEvent(Guid eventId)
        {
            var _event = _repository.FutureEvents.GetFutureEvent(eventId);
            return Ok(_event);
        }

        [HttpPost("add_event")]
        public IActionResult AddEvent(FutureEvent concert)
        {
            _repository.FutureEvents.CreateFutureEvent(concert);
            _repository.Save();
            return Ok();
        }

        [HttpGet("search_result")]
        public IActionResult GetResultsBySearch([FromQuery] string search)
        {
            var _events = _repository.FutureEvents.GetFutureEventsByString(search, false).ToList();
            return _events.Count != 0 ? Ok(_events) : NotFound();
        }
    }
}
