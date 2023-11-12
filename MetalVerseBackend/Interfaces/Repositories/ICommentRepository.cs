using MetalVerseBackend.Models;

namespace MetalVerseBackend.Interfaces.Repositories
{
    public interface ICommentRepository
    {
        Comment GetComment(Guid commentId);
        IEnumerable<Comment> GetComments(bool trackChanges);
        IEnumerable<Comment> GetCommentsByPost(Guid postId, bool trackChanges);
        void CreateComment(Comment comment);
    }
}
