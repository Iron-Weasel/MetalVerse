using MetalVerseBackend.Models;
using MetalVerseBackend.Models.Dtos;

namespace MetalVerseBackend.Interfaces
{
    public interface IPostService
    {
        List<Post> GetPosts();
        PostWithCommentsDto GetPost(Guid postId);
        List<Post> GetPostsBySearch(string search);
        void AddPost(Post post);
        void ComputeViews(Guid postId);
        void ComputeRockOns(Guid postId, bool toIncrease);
    }
}
