namespace MetalVerseBackend.Models.Dtos
{
    public class ConversationDto
    {
        public Guid Id { get; set; }
        public List<UserDto> Participants { get; set; }
        public MessageDto LastMessage { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}
