using MetalVerseBackend.Interfaces;
using MetalVerseBackend.Interfaces.Repositories;
using MetalVerseBackend.Models;
using System.IO;

namespace MetalVerseBackend.Services
{
    public class StreamService : IStreamService
    {
        private readonly IRepositoryManager _repository;
        public StreamService(IRepositoryManager repository) 
        {
            _repository = repository;
        }

        public void AddStream(RockStream stream)
        {
            _repository.Streams.CreateStream(stream);
            _repository.Save();
        }

        public RockStream GetStream(Guid streamId)
        {
            return _repository.Streams.GetRockStream(streamId);
        }

        public List<RockStream> GetStreams()
        {
            return _repository.Streams.GetRockStreams(false).ToList();
        }

        public List<RockStream> GetStreamsBySearch(string search)
        {
            return _repository.Streams.GetRockStreamsByString(search, false).ToList();
        }
    }
}
