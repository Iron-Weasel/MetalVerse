using MetalVerseBackend.Interfaces.Repositories;
using MetalVerseBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace MetalVerseBackend.Controllers
{

    [ApiController]
    [Route("announcements")]
    public class AnnouncementController : ControllerBase
    {
        //private List<Announcement> _announcements = new List<Announcement>();
        private readonly IRepositoryManager _repository;
        /*        public AnnouncementController()
                {
                    _announcements.Add(new Announcement()
                    {
                        Id = Guid.NewGuid(),
                        Title = "Drummer wanted",
                        UserId = Guid.Parse("5d899972-6bfa-413d-bfa7-619fcfcd2706"),
                        Description = "We are just looking for a drinking buddy who can play the drumms for our band",
                        Image = "Some image mate"
                    }
                    );
                    _announcements.Add(new Announcement()
                    {
                        Id = Guid.NewGuid(),
                        Title = "Frontman wanted",
                        UserId = Guid.Parse("5d899972-6bfa-413d-bfa7-619fcfcd2706"),
                        Description = "We are just looking for a drinking buddy who can be our frontman and attract some spicy senoritas for the rest of the band",
                        Image = "Some image mate"
                    }
                    );
                }*/

        public AnnouncementController(IRepositoryManager repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAnnouncements()
        {
            var _announcements = _repository.Announcements.GetAnnouncements(false);
            return Ok(_announcements);
        }

        [HttpGet("annoucementId")]
        public IActionResult GetAnnouncement(Guid announcementId)
        {
            var _announcement = _repository.Announcements.GetAnnouncement(announcementId); 
            return Ok(_announcement);
        }

        [HttpPost("add_announcement")]
        public IActionResult AddAnnouncement(Announcement announcement)
        {
            _repository.Announcements.CreateAnnouncement(announcement);
            _repository.Save();
            return Ok();
        }


        [HttpGet("search_result")]
        public IActionResult GetResultsBySearch([FromQuery] string search)
        {
            var _announcements = _repository.Announcements.GetAnnouncementsByString(search, false).ToList();
            return _announcements.Count !=0 ? Ok(_announcements) : NotFound();
        }
    }
}
