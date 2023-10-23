using MetalVerseBackend.Models;

namespace MetalVerseBackend.Interfaces
{
    public interface IPostService
    {
        void AddPost(Post post);
        int ComputeViews();
        int ComputeRockOns();
    }
}
