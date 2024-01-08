using MetalVerseBackend.Models;
using MetalVerseBackend.Models.Dtos;

namespace MetalVerseBackend.Interfaces
{
    public interface IPostService
    {
        Task<List<Post>> GetPosts();
        Task<PostWithCommentsDto> GetPost(Guid postId);
        Task<List<Post>> GetPostsBySearch(string search);
        Task AddPost(Post post);
        Task ComputeViews(Guid postId);
        Task ComputeRockOns(Guid postId, bool toIncrease);
    }
}
