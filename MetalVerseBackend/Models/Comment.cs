namespace MetalVerseBackend.Models
{
    public class Comment
    {
        public Guid Id { get; set; }       // a comment will have its own ID
        public Guid PostId { get; set; }   // a certain comment is linked to only one post
        public Guid UserId { get; set; }   // a certain comment is linked to only one user
        public required string Text { get; set; }
        public DateTime PostedDate { get; set; }
        public int RockOns;
    }
}
