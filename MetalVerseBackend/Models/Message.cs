namespace MetalVerseBackend.Models
{
    public class Message
    {
        public required Guid Id { get; set; }
        public required Guid ConversationId { get; set; }
        public required Guid Receiver { get; set; }
        public required Guid Sender { get; set; }
        public required DateTime DateTime { get; set; }
        public string? Text { get; set; }    
    }
}
