using MetalVerseBackend.Interfaces;
using MetalVerseBackend.Interfaces.Repositories;
using MetalVerseBackend.Models;
using Newtonsoft.Json;
using System.IO;
using System.Security.Policy;

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

        public async Task<StreamMetadata> GetStreamMetadata(Guid streamId)
        {
            var _stream = _repository.Streams.GetRockStream(streamId);
            var streamName = HandleStreamNames(_stream.Name);
            var metadataUrl = $"https://www.rockantenne.de/api/metadata/now/{streamName}";

            var _httpClient = new HttpClient();
            try
            {
                var response = await _httpClient.GetAsync(metadataUrl);
                if (!response.IsSuccessStatusCode)
                {
                    return null;
                }

                var content = await response.Content.ReadAsStringAsync();
                var metadata = JsonConvert.DeserializeObject<StreamMetadata>(content);
                var songTitle = metadata.data.title;
                var artist = metadata.data.artist;
                var albumCover = metadata.data.cover.GetCoverImageUrl();

                return new StreamMetadata 
                { 
                    SongTitle = songTitle,
                    Artist = artist,
                    AlbumCover = albumCover
                };
            }
            catch (HttpRequestException ex)
            {
                return null;
            }
        }

        private string HandleStreamNames(string streamName)
        {
            streamName = streamName.ToLower();
            if (streamName.Contains(" "))
            {
                streamName = streamName.Replace(" ", "-");
            }

            if(streamName.Contains("hard-rock"))
            {
                streamName = "rock-antenne-" + streamName;
            }

            return streamName;
        }
    }
}
