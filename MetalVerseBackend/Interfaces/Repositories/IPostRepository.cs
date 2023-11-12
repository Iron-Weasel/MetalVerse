using MetalVerseBackend.Models;

namespace MetalVerseBackend.Interfaces.Repositories
{
    public interface IPostRepository
    {
        Post GetPost(Guid postId);
        IEnumerable<Post> GetPosts(bool trackChanges);
        IEnumerable<Post> GetPostsByString(string search, bool trackChanges);
        void CreatePost(Post post);
    }
}
