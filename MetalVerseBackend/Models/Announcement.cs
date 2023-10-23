public class Announcement
{
    public Guid Id {  get; set; }
    public required Guid UserId { get; set; }
    public required string Title { get; set; }
    public string Description { get; set; }
    public string? Image { get; set; }
}
