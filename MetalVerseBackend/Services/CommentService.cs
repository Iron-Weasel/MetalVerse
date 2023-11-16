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
            _repository.Comments.CreateComment(comment);
            _repository.Save();
        }

        public int ComputeRockOns()
        {
            throw new NotImplementedException();
        }
    }
}
