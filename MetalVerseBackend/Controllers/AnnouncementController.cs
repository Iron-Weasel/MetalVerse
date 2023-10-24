using MetalVerseBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace MetalVerseBackend.Controllers
{

    [ApiController]
    [Route("announcements")]
    public class AnnouncementController : ControllerBase
    {
        private List<Announcement> _announcements = new List<Announcement>();
        public AnnouncementController()
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
        }

        [HttpGet]
        public IActionResult GetAnnouncements()
        {
            return Ok(_announcements);
        }

        [HttpGet("annoucementId")]
        public IActionResult GetAnnouncement(Guid announcementId)
        {
            return Ok(_announcements.FirstOrDefault(x => x.Id == announcementId));
        }

        [HttpPost("add_announcement")]
        public IActionResult AddAnnouncement(Announcement announcement)
        {
            _announcements.Add(announcement);
            return Ok(_announcements);
        }
    }
}
