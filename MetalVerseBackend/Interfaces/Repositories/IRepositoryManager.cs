namespace MetalVerseBackend.Interfaces.Repositories
{
    public interface IRepositoryManager
    {
        IRockStreamRepository Streams { get; }
        IAnnouncementRepository Announcements { get; }
        IFutureEventRepository FutureEvents { get; }
        IUserRepository Users { get; }
        void Save();
    }
}
