using MetalVerseBackend.Data;
using MetalVerseBackend.Interfaces.Repositories;

namespace MetalVerseBackend.Repositories
{
    public class AnnouncementRepository : RepositoryBase<Announcement>, IAnnouncementRepository
    {
        public AnnouncementRepository(ApplicationDbContext ApplicationContext) : base(ApplicationContext) { }
        public void CreateAnnouncement(Announcement announcement) => Create(announcement);

        public Announcement GetAnnouncement(Guid announcementId) => FindByCondition(x => x.Id == announcementId, false).First();

        public IEnumerable<Announcement> GetAnnouncements(bool trackChanges) => FindAll(trackChanges).ToList();

        public IEnumerable<Announcement> GetAnnouncementsByString(string search, bool trackChanges) => FindByCondition(x => x.Title.Contains(search), trackChanges).ToList();
    }
}
