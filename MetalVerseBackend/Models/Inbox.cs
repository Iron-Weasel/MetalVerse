using MetalVerseBackend.Models;
using System;

public class Inbox
{
    public Guid UserId { get; set; }
    public List<Message> Messages { get; set; }
}
