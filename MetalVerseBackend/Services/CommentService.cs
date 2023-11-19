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

        public void AddComment(Comment comment)
        {
            comment.Id = Guid.NewGuid();
            comment.RockOns = 0;
            comment.PostedDate= DateTime.UtcNow;

            _repository.Comments.CreateComment(comment);
            _repository.Save();
        }

        public int ComputeRockOns()
        {
            throw new NotImplementedException();
        }
    }
}
