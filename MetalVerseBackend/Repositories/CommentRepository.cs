using MetalVerseBackend.Data;
using MetalVerseBackend.Interfaces.Repositories;
using MetalVerseBackend.Models;

namespace MetalVerseBackend.Repositories
{
    public class CommentRepository : RepositoryBase<Comment>, ICommentRepository
    {
        public CommentRepository(ApplicationDbContext _ApplicationDbContext) : base(_ApplicationDbContext) { }
        public void CreateComment(Comment comment) => Create(comment);

        public Comment GetComment(Guid commentId) => FindByCondition(x => x.Id == commentId, false).First();

        public IEnumerable<Comment> GetComments(bool trackChanges) => FindAll(trackChanges).ToList();

        public IEnumerable<Comment> GetCommentsByPost(Guid postId, bool trackChanges) => FindByCondition(x => x.PostId == postId, trackChanges).ToList();
    }
}
