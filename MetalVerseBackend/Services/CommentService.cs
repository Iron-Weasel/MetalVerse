using MetalVerseBackend.Interfaces;
using MetalVerseBackend.Interfaces.Repositories;
using MetalVerseBackend.Models;

namespace MetalVerseBackend.Services
{
    public class CommentService : ICommentService
    {
        private readonly IRepositoryManager _repository;
        public CommentService(IRepositoryManager repository) 
        {
            _repository = repository;
        }

        public async Task AddComment(Comment comment)
        {
            comment.Id = Guid.NewGuid();
            comment.RockOns = 0;
            comment.PostedDate= DateTime.UtcNow;

            _repository.Comments.CreateComment(comment);
            await _repository.Save();
        }

        public async Task ComputeRockOns(Guid commentId, bool toIncrease)
        {
            var _comment = _repository.Comments.GetComment(commentId);
            if (_comment != null)
            {
                if (toIncrease == true) _comment.RockOns += 1;
                else _comment.RockOns -= 1;
                await _repository.Save();
            };
        }
    }
}
