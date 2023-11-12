using MetalVerseBackend.Models;

namespace MetalVerseBackend.Interfaces.Repositories
{
    public interface IAnnouncementRepository
    {
        Announcement GetAnnouncement(Guid announcementId);
        IEnumerable<Announcement> GetAnnouncements(bool trackChanges);
        IEnumerable<Announcement> GetAnnouncementsByString(string search, bool trackChanges);
        void CreateAnnouncement(Announcement announcement);
    }
}
