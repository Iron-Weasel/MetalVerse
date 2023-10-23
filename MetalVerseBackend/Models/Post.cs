namespace MetalVerseBackend.Models
{
    public class Post
    {
        public Guid Id { get; set; }       // a post will have its own ID
        public Guid UserId { get; set; }  // a certain post is linked to only one user
        public required string Title { get; set; }
        public required string Description { get; set; }
        public string? ImageURL;
        public DateTime CreatedDate { get; set; }
        public int Views;
        public int RockOns;
        public int Comments;
        public List<Comment> CommentsList;
    }
}
