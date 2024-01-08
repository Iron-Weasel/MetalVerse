using MetalVerseBackend.Models;

namespace MetalVerseBackend.Interfaces
{
    public interface IStreamService
    {
        List<RockStream> GetStreams();
        RockStream GetStream(Guid streamId);
        List<RockStream> GetStreamsBySearch(string search);
        void AddStream(RockStream concert);
        Task<StreamMetadata> GetStreamMetadata(Guid streamId);
    }
}
