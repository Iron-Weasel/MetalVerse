namespace MetalVerseBackend.Models.Dtos
{
    public class MessageDto
    {
        public required Guid Receiver { get; set; }
        public required Guid Sender { get; set; }
        public required DateTime DateTime { get; set; }
        public string? Text { get; set; }
    }
}
