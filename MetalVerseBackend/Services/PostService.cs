using AutoMapper;
using MetalVerseBackend.Interfaces;
using MetalVerseBackend.Interfaces.Repositories;
using MetalVerseBackend.Models;
using MetalVerseBackend.Models.Dtos;
using MetalVerseBackend.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace MetalVerseBackend.Services
{
    public class PostService : IPostService
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repository;

        public PostService(IMapper mapper, IRepositoryManager repository) 
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task AddPost(Post post)
        {
            post.Id = Guid.NewGuid();
            post.Views = 0;
            post.RockOns = 0;
            post.Comments = 0;
            post.CreatedDate = DateTime.UtcNow;

            _repository.Posts.CreatePost(post);
            await _repository.Save();
        }

        public async Task ComputeViews(Guid postId)
        {
            var _post = _repository.Posts.GetPost(postId);
            if (_post != null)
            {
                _post.Views += 1;
                await _repository.Save();
            }
        }

        public async Task ComputeRockOns(Guid postId, bool toIncrease)
        {
            var _post = _repository.Posts.GetPost(postId);
            if (_post != null)
            {
                if (toIncrease == true) _post.RockOns += 1;
                else _post.RockOns -= 1;
                await _repository.Save();
            };
        }

        public async Task<PostWithCommentsDto> GetPost(Guid postId)
        {
            var _post = _repository.Posts.GetPost(postId);
            var _comments = _repository.Comments.GetCommentsByPost(postId, false);
            var postWithCommentsDto = _mapper.Map<PostWithCommentsDto>(_post);
            postWithCommentsDto.Comments = _mapper.Map<List<CommentDto>>(_comments);

            return postWithCommentsDto;
        }

        public async Task<List<Post>> GetPosts()
        {
            var _posts = _repository.Posts.GetPosts(false).ToList();
            return _posts;
        }

        public async Task<List<Post>> GetPostsBySearch(string search)
        {
            return _repository.Posts.GetPostsByString(search, false).ToList();
        }
    }
}
