using MetalVerseBackend.Models;

namespace MetalVerseBackend.Interfaces
{
    public interface ICommentService
    {
        void AddComment(Comment comment);
        void ComputeRockOns(Guid commentId, bool toIncrease);
    }
}
