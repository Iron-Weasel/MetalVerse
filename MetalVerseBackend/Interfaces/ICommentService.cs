using MetalVerseBackend.Models;

namespace MetalVerseBackend.Interfaces
{
    public interface ICommentService
    {
        Task AddComment(Comment comment);
        Task ComputeRockOns(Guid commentId, bool toIncrease);
    }
}
