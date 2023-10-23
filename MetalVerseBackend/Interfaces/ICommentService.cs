using MetalVerseBackend.Models;

namespace MetalVerseBackend.Interfaces
{
    public interface ICommentService
    {
        void AddComment(Guid postId, string Text);
        int ComputeRockOns();
    }
}
