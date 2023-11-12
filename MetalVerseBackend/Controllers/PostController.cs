using MetalVerseBackend.Interfaces;
using MetalVerseBackend.Interfaces.Repositories;
using MetalVerseBackend.Models;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Linq;

namespace MetalVerseBackend.Controllers
{
    [ApiController]
    [Route("posts")]
    public class PostController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly IPostWithCommentsService _postWithCommentsService;
        public PostController(IRepositoryManager repository, IPostWithCommentsService service)
        {
            _repository = repository;
            _postWithCommentsService = service;
            /*
            _posts.Add(new Post()
            {
                Id = Guid.Parse("5d899972-6bfa-413d-bfa7-619fcfcd2706"),
                UserId = Guid.Parse("5d899972-6bfa-413d-bfa7-619fcfcd2706"),
                Title = "B",
                Description = "C"
            });

            _posts.Add(new Post()
            {
                Id = Guid.Parse("67db0b44-fed7-49eb-9fa5-d291fe9cde64"),
                UserId = Guid.Parse("5d899972-6bfa-413d-bfa7-619fcfcd2706"),
                Title = "X",
                Description = "Y",
                Views = 3,
                RockOns = 4
            });*/
        }

        [HttpGet]
        public IActionResult GetPosts()
        {
            var _posts = _repository.Posts.GetPosts(false).ToList();
            return Ok(_posts);
        }

        [HttpGet("{postId}")]
        public IActionResult GetPost(Guid postId)
        {
            var _post = _postWithCommentsService.GetPostWithComments(postId);
            return Ok(_post);
        }

        [HttpPost("add_post")]
        public IActionResult AddPost(Post post)
        {
            _repository.Posts.CreatePost(post);
            _repository.Save();
            return Ok();
        }

        [HttpGet("search_result")]
        public IActionResult GetResultsBySearch([FromQuery] string search)
        {
            var _posts = _repository.Posts.GetPostsByString(search, false).ToList();
            return _posts.Count != 0 ? Ok(_posts) : NotFound();
        }
    }
}
