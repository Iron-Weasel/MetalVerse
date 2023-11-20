using MetalVerseBackend.Models;

namespace MetalVerseBackend.Interfaces
{
    public interface ICommentService
    {
        void AddComment(Comment comment);
        int ComputeRockOns();
    }
}
