﻿using MetalVerseBackend.Models;

namespace MetalVerseBackend.Interfaces
{
    public interface IAnnouncementService
    {
        List<Announcement> GetAnnouncements();
        Announcement GetAnnouncement(Guid announcementId);
        List<Announcement> GetAnnouncementsBySearch(string search);
        Task AddAnnouncement(Announcement announcement);
    }
}
