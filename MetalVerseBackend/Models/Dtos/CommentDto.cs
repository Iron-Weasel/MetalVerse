namespace MetalVerseBackend.Models.Dtos
{
    public class CommentDto
    {
        public Guid Id { get; set; }
        public required string UserName { get; set; }
        public required string Text { get; set; }
        public DateTime PostedDate { get; set; }
        public int RockOns { get; set; }
    }
}
