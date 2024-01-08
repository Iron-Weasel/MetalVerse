using MetalVerseBackend.Models;
using MetalVerseBackend.Models.Dtos;

namespace MetalVerseBackend.Interfaces
{
    public interface IEventsService
    {
        List<FutureEvent> GetEvents();
        FutureEvent GetEvent(Guid postId);
        List<FutureEvent> GetFutureEventsBySearch(string search);
        Task AddEvent(FutureEvent concert);
    }
}
