namespace MetalVerseBackend.Models
{
    public class FutureEvent
    {
        public Guid Id { get; set; }  
        public required string Title { get; set; }
        public required string ImageURL;
        public required string BandCountry { get; set; }
        public required string BandGenre { get; set; }
        public required string Country { get; set; }
        public string? State { get; set; }
        public string? County { get; set; }
        public required string City { get; set; }
        public required string VenueName { get; set; }
        public DateTime EventTime { get; set; }
        public required string FacebookPage;
        public string? WikiPage;
        public string? BandPage;
        public required string TicketPurchasePage;
    }
}
