using MetalVerseBackend.Models;

namespace MetalVerseBackend.Interfaces
{
    public interface IEventsService
    {
        void AddEvent(FutureEvent concert);
    }
}
