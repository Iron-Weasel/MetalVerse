using MetalVerseBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace MetalVerseBackend.Controllers
{
    [ApiController]
    [Route("events")]
    public class FutureEventsController : ControllerBase
    {
        private List<FutureEvent> _events = new List<FutureEvent>();
        public FutureEventsController() 
        {
            _events.Add(new FutureEvent()
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

            });
        }
        [HttpGet]
        public IActionResult GetEvents()
        {
            return Ok(_events);
        }

        [HttpGet("{eventId}")]
        public IActionResult GetEvent(Guid eventId)
        {
            return Ok(_events.FirstOrDefault(x => x.Id == eventId));
        }

        [HttpPost("add_event")]
        public IActionResult AddEvent(FutureEvent concert)
        {
            _events.Add(concert);
            return Ok(_events);
        }
    }
}
