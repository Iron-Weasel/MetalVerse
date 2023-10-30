using MetalVerseBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace MetalVerseBackend.Controllers
{
    [ApiController]
    [Route("inbox/{userId}")]
    public class InboxController:ControllerBase
    {
        private List<Inbox> _inboxes = new List<Inbox>();
        public InboxController()
        {
            Inbox inbox1 = new Inbox()
            {
                UserId = Guid.Parse("5d899972-6bfa-413d-bfa7-619fcfcd2706"),
                Messages = new List<Message> {
                    new Message()
                    {
                        Id = Guid.NewGuid(),
                        Receiver = Guid.Parse("5d899972-6bfa-413d-bfa7-619fcfcd2706"),
                        Sender = Guid.Parse("ece3e87c-9211-4855-83bc-6657a7d67c56"),
                        DateTime = DateTime.Now,
                        Text = "Some text"
                    },
                    new Message()
                    {
                        Id = Guid.NewGuid(),
                        Receiver = Guid.Parse("5d899972-6bfa-413d-bfa7-619fcfcd2706"),
                        Sender = Guid.Parse("67db0b44-fed7-49eb-9fa5-d291fe9cde64"),
                        DateTime = DateTime.Now,
                        Text = "Some text"
                    },
                    new Message()
                    {
                        Id = Guid.NewGuid(),
                        Receiver = Guid.Parse("5d899972-6bfa-413d-bfa7-619fcfcd2706"),
                        Sender = Guid.Parse("ece3e87c-9211-4855-83bc-6657a7d67c56"),
                        DateTime = DateTime.Now,
                        Text = "Some text"
                    }
                }

            };
            _inboxes.Add(inbox1); 

            Inbox inbox2 = new Inbox()
            {
                UserId = Guid.Parse("67db0b44-fed7-49eb-9fa5-d291fe9cde64"),
                Messages = new List<Message> {
                    new Message()
                    {
                        Id = Guid.NewGuid(),
                        Receiver = Guid.Parse("67db0b44-fed7-49eb-9fa5-d291fe9cde64"),
                        Sender = Guid.Parse("5d899972-6bfa-413d-bfa7-619fcfcd2706"),
                        DateTime = DateTime.Now,
                        Text = "Some text"
                    },
                    new Message()
                    {
                        Id = Guid.NewGuid(),
                        Receiver = Guid.Parse("67db0b44-fed7-49eb-9fa5-d291fe9cde64"),
                        Sender = Guid.Parse("5d899972-6bfa-413d-bfa7-619fcfcd2706"),
                        DateTime = DateTime.Now,
                        Text = "Some text"
                    },
                    new Message()
                    {
                        Id = Guid.NewGuid(),
                        Receiver = Guid.Parse("67db0b44-fed7-49eb-9fa5-d291fe9cde64"),
                        Sender = Guid.Parse("ece3e87c-9211-4855-83bc-6657a7d67c56"),
                        DateTime = DateTime.Now,
                        Text = "Some text"
                    }
                }

            };
            _inboxes.Add(inbox2);

            Inbox inbox3 = new Inbox()
            {
                UserId = Guid.Parse("ece3e87c-9211-4855-83bc-6657a7d67c56"),
                Messages = new List<Message> {
                    new Message()
                    {
                        Id = Guid.NewGuid(),
                        Receiver = Guid.Parse("ece3e87c-9211-4855-83bc-6657a7d67c56"),
                        Sender = Guid.Parse("5d899972-6bfa-413d-bfa7-619fcfcd2706"),
                        DateTime = DateTime.Now,
                        Text = "Some text"
                    },
                    new Message()
                    {
                        Id = Guid.NewGuid(),
                        Receiver = Guid.Parse("ece3e87c-9211-4855-83bc-6657a7d67c56"),
                        Sender = Guid.Parse("67db0b44-fed7-49eb-9fa5-d291fe9cde64"),
                        DateTime = DateTime.Now,
                        Text = "Some text"
                    },
                    new Message()
                    {
                        Id = Guid.NewGuid(),
                        Receiver = Guid.Parse("ece3e87c-9211-4855-83bc-6657a7d67c56"),
                        Sender = Guid.Parse("67db0b44-fed7-49eb-9fa5-d291fe9cde64"),
                        DateTime = DateTime.Now,
                        Text = "Some text"
                    }
                }

            };
            _inboxes.Add(inbox3);
        }
        

/*        [HttpGet]
        public IActionResult GetInboxes() 
        {
            return Ok(_inboxes);
        }*/

        [HttpGet]
        public IActionResult GetInbox(Guid userId) { 
            return Ok(_inboxes.FirstOrDefault(x => x.UserId == userId));
        }

        [HttpPost]
        public IActionResult SendMessage(Message message)
        {
            return Ok();
        }
    }
}
