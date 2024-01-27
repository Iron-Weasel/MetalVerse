namespace MetalVerseBackend.Models.Dtos
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public required string Username { get; set; }
    }
}
