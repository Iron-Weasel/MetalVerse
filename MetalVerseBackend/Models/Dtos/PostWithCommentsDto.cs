namespace MetalVerseBackend.Models.Dtos
{
    public class PostWithCommentsDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageURL { get; set; }
        public DateTime CreatedDate { get; set; }
        public int Views { get; set; }
        public int RockOns { get; set; }
        public List<CommentDto> Comments { get; set; }
    }
}
