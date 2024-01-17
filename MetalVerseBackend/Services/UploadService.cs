using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using MetalVerseBackend.Interfaces;

namespace MetalVerseBackend.Services
{
    public class UploadService : IUploadService
    {
        private readonly string _storageConnectionString;
        public UploadService(IConfiguration configuration)
        {
            _storageConnectionString = configuration.GetConnectionString("AzureStorage");
        }
        public async Task<string> UploadAsync(Stream fileStream, string fileName)
        {
            var container = new BlobContainerClient(_storageConnectionString, "metalverse");
            var blob = container.GetBlobClient(fileName);
            await blob.DeleteIfExistsAsync(DeleteSnapshotsOption.IncludeSnapshots);
            await blob.UploadAsync(fileStream); 
            return blob.Uri.ToString();
        }
    }
}
