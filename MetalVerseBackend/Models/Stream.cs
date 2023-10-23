namespace MetalVerseBackend.Models
{
    public class Stream
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public string Image { get; set; }
        public required string ApiLink { get; set; }
    }
}
