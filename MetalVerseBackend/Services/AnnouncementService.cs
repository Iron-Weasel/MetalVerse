using MetalVerseBackend.Interfaces;
using MetalVerseBackend.Interfaces.Repositories;

namespace MetalVerseBackend.Services
{
    public class AnnouncementService : IAnnouncementService
    {
        private readonly IRepositoryManager _repository;
        
        public AnnouncementService(IRepositoryManager repository) 
        {   
            _repository = repository;
        }

        public void AddAnnouncement(Announcement announcement)
        {
            _repository.Announcements.CreateAnnouncement(announcement);
            _repository.Save();
        }

        public Announcement GetAnnouncement(Guid announcementId)
        {
            return _repository.Announcements.GetAnnouncement(announcementId);
        }

        public List<Announcement> GetAnnouncements()
        {
            return _repository.Announcements.GetAnnouncements(false).ToList();
        }

        public List<Announcement> GetAnnouncementsBySearch(string search)
        {
            return _repository.Announcements.GetAnnouncementsByString(search, false).ToList();
        }
    }
}
