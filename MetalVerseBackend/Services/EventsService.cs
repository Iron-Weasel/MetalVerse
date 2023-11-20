using MetalVerseBackend.Interfaces;
using MetalVerseBackend.Interfaces.Repositories;
using MetalVerseBackend.Models;
using Microsoft.Extensions.Logging;

namespace MetalVerseBackend.Services
{
    public class EventsService : IEventsService
    {
        private readonly IRepositoryManager _repository;
        public EventsService(IRepositoryManager repository)
        {
            _repository = repository;
        }
        
        public void AddEvent(FutureEvent concert)
        {
            concert.Id = Guid.NewGuid();

            _repository.FutureEvents.CreateFutureEvent(concert);
            _repository.Save();
        }

        public FutureEvent GetEvent(Guid eventId)
        {
            return _repository.FutureEvents.GetFutureEvent(eventId);
        }

        public List<FutureEvent> GetEvents()
        {
            return _repository.FutureEvents.GetFutureEvents(false).ToList();
        }

        public List<FutureEvent> GetFutureEventsBySearch(string search)
        {
            return _repository.FutureEvents.GetFutureEventsByString(search, false).ToList();
        }
    }
}
