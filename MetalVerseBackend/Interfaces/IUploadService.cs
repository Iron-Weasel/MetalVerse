namespace MetalVerseBackend.Interfaces
{
    public interface IUploadService
    {
        Task<string> UploadAsync(Stream fileStream, string fileName);
    }
}
