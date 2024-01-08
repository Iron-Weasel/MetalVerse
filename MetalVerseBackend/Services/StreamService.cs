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
            var metadataUrl = $"https://www.rockantenne.de/api/metadata/now/{_stream.StreamKeyword}";

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
                var albumCover = metadata.data.cover != null ? metadata.data.cover.GetCoverImageUrl() : "https://fastly.picsum.photos/id/548/200/200.jpg?hmac=OSCQ-YL2a-5iYm7-5vVwigtt78bNIZFxNRaWP8pZ_bw";

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
    }
}
