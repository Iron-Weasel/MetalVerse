namespace MetalVerseBackend.Models
{
    public class RockStream
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public string Image { get; set; }
        public required string ApiLink { get; set; }
        public string StreamKeyword { get; set; }
    }
}
