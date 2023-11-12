using MetalVerseBackend.Data;
using MetalVerseBackend.Interfaces.Repositories;
using MetalVerseBackend.Models;
using System.IO;

namespace MetalVerseBackend.Repositories
{

    public class RockStreamRepository : RepositoryBase<RockStream>, IRockStreamRepository
    {
        public RockStreamRepository(ApplicationDbContext ApplicationContext) : base(ApplicationContext) { }

        public RockStream GetRockStream(Guid streamId) => FindByCondition(x => x.Id == streamId, false).First();
        public IEnumerable<RockStream> GetRockStreams(bool trackChanges) => FindAll(trackChanges).ToList();
        public IEnumerable<RockStream> GetRockStreamsByString(string search, bool trackChanges) => FindByCondition(x => x.Name.Contains(search), trackChanges).ToList();

        public void CreateStream(RockStream stream) => Create(stream);

    }
}
