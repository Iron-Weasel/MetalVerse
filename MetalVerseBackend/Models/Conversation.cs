namespace MetalVerseBackend.Models
{
    public class Conversation
    {
        public Guid Id { get; set; }
        public List<User> Participants { get; set; }
        public List<Message> Messages { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}
