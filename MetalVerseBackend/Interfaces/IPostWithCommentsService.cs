using MetalVerseBackend.Models.Dtos;

namespace MetalVerseBackend.Interfaces
{
    public interface IPostWithCommentsService
    {
        public PostWithCommentsDto GetPostWithComments(Guid postId);
    }
}
