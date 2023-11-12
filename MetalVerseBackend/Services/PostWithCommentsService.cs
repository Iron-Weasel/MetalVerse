using AutoMapper;
using MetalVerseBackend.Interfaces;
using MetalVerseBackend.Interfaces.Repositories;
using MetalVerseBackend.Models.Dtos;
using MetalVerseBackend.Models;
using Microsoft.Extensions.Hosting;
using System.Xml.Linq;

namespace MetalVerseBackend.Services
{
    public class PostWithCommentsService : IPostWithCommentsService
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repository;
        public PostWithCommentsService(IMapper mapper, IRepositoryManager repository)
        {
            _mapper = mapper;
            _repository = repository;
            
        }

        public PostWithCommentsDto GetPostWithComments(Guid postId)
        {
            var _post = _repository.Posts.GetPost(postId);
            var _comments = _repository.Comments.GetCommentsByPost(postId, false);
            var postWithCommentsDto = _mapper.Map<PostWithCommentsDto>(_post);
            postWithCommentsDto.Comments = _mapper.Map<List<CommentDto>>(_comments);

            return postWithCommentsDto;
        }
    }
}
