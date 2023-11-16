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
        private readonly IPostService _postService;
        public PostController(IPostService service)
        {
            _postService = service;
        }

        [HttpGet]
        public IActionResult GetPosts()
        {
            var _posts = _postService.GetPosts();
            return Ok(_posts);
        }

        [HttpGet("{postId}")]
        public IActionResult GetPost(Guid postId)
        {
            var _post = _postService.GetPost(postId);
            return Ok(_post);
        }

        [HttpPost("add_post")]
        public IActionResult AddPost(Post post)
        {
            _postService.AddPost(post);
            return Ok();
        }

        [HttpGet("search_result")]
        public IActionResult GetResultsBySearch([FromQuery] string search)
        {
            var _posts = _postService.GetPostsBySearch(search);
            return _posts.Count != 0 ? Ok(_posts) : NotFound();
        }
    }
}
