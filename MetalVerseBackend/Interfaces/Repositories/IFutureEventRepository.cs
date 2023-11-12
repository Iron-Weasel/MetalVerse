using MetalVerseBackend.Models;

namespace MetalVerseBackend.Interfaces.Repositories
{
    public interface IFutureEventRepository
    {
        FutureEvent GetFutureEvent(Guid futureEventId);
        IEnumerable<FutureEvent> GetFutureEvents(bool trackChanges);
        IEnumerable<FutureEvent> GetFutureEventsByString(string search, bool trackChanges);
        void CreateFutureEvent(FutureEvent futureEvent);
    }
}
