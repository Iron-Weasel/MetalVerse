using AutoMapper;
using MetalVerseBackend.Interfaces;
using MetalVerseBackend.Interfaces.Repositories;
using MetalVerseBackend.Models;
using MetalVerseBackend.Models.Dtos;

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

        public void AddPost(Post post)
        {
            post.Id = Guid.NewGuid();
            post.Views = 0;
            post.RockOns = 0;
            post.Comments = 0;
            post.CreatedDate = DateTime.UtcNow;

            _repository.Posts.CreatePost(post);
            _repository.Save();
        }

        public int ComputeRockOns()
        {
            throw new NotImplementedException();
        }

        public int ComputeViews()
        {
            throw new NotImplementedException();
        }

        public PostWithCommentsDto GetPost(Guid postId)
        {
            var _post = _repository.Posts.GetPost(postId);
            var _comments = _repository.Comments.GetCommentsByPost(postId, false);
            var postWithCommentsDto = _mapper.Map<PostWithCommentsDto>(_post);
            postWithCommentsDto.Comments = _mapper.Map<List<CommentDto>>(_comments);

            return postWithCommentsDto;
        }

        public List<Post> GetPosts()
        {
            var _posts = _repository.Posts.GetPosts(false).ToList();
            return _posts;
        }

        public List<Post> GetPostsBySearch(string search)
        {
            return _repository.Posts.GetPostsByString(search, false).ToList();
        }
    }
}
