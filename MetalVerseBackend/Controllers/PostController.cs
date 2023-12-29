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

        [HttpPost("post_visited/{postId}")]
        public IActionResult IncreasePostViews(Guid postId)
        {
            _postService.ComputeViews(postId);
            return Ok();
        }

        [HttpPost("post_liked/{postId}")]
        public IActionResult IncreasePostRockOns(Guid postId)
        {
            _postService.ComputeRockOns(postId, true);
            return Ok();
        }

        [HttpPost("post_disliked/{postId}")]
        public IActionResult DecreasePostRockOns(Guid postId)
        {
            _postService.ComputeRockOns(postId, false);
            return Ok();
        }

        [HttpGet("search_result")]
        public IActionResult GetResultsBySearch([FromQuery] string search)
        {
            var _posts = _postService.GetPostsBySearch(search);
            return _posts.Count != 0 ? Ok(_posts) : Ok();
        }

        [HttpGet("sort_newest")]
        public IActionResult GetNewestPosts()
        {
            var _posts = _postService.GetPosts().OrderByDescending(x => x.CreatedDate);
            return Ok(_posts);
        }

        [HttpGet("sort_popular")]
        public IActionResult GetPopularPosts()
        {
            var _posts = _postService.GetPosts().OrderByDescending(x => x.Views);
            return Ok(_posts);
        }
    }
}
