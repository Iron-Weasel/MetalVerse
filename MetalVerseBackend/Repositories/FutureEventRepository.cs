using MetalVerseBackend.Data;
using MetalVerseBackend.Interfaces.Repositories;
using MetalVerseBackend.Models;

namespace MetalVerseBackend.Repositories
{
    public class FutureEventRepository : RepositoryBase<FutureEvent>, IFutureEventRepository
    {
        public FutureEventRepository(ApplicationDbContext _ApplicationDbContext) : base(_ApplicationDbContext) { }

        public void CreateFutureEvent(FutureEvent futureEvent) => Create(futureEvent);

        public FutureEvent GetFutureEvent(Guid futureEventId) => FindByCondition(x => x.Id == futureEventId, false).First();

        public IEnumerable<FutureEvent> GetFutureEvents(bool trackChanges) => FindAll(trackChanges).ToList();

        public IEnumerable<FutureEvent> GetFutureEventsByString(string search, bool trackChanges) => FindByCondition(x => x.Title.Contains(search), trackChanges).ToList();

    }
}
