using Microsoft.AspNetCore.Identity;

namespace MetalVerseBackend.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public required string Username { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string UserRole; 
    }
}
