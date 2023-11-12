using MetalVerseBackend.Models;
using System.Diagnostics.Eventing.Reader;

namespace MetalVerseBackend.Interfaces.Repositories
{
    public interface IRockStreamRepository
    {
        RockStream GetRockStream(Guid streamId);
        IEnumerable<RockStream> GetRockStreams(bool trackChanges);
        IEnumerable<RockStream> GetRockStreamsByString(string search, bool trackChanges);
        void CreateStream(RockStream stream);
    }
}
