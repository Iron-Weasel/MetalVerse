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
        public async Task<IActionResult> GetPosts()
        {
            var _posts = await _postService.GetPosts();
            return Ok(_posts);
        }

        [HttpGet("{postId}")]
        public async Task<IActionResult> GetPost(Guid postId)
        {
            var _post = await _postService.GetPost(postId);
            return Ok(_post);
        }

        [HttpPost("add_post")]
        public async Task<IActionResult> AddPost(Post post)
        {
            await _postService.AddPost(post);
            return Ok();
        }

        [HttpPost("post_visited/{postId}")]
        public async Task<IActionResult> IncreasePostViews(Guid postId)
        {
            await _postService.ComputeViews(postId);
            return Ok();
        }

        [HttpPost("post_liked/{postId}")]
        public async Task<IActionResult> IncreasePostRockOns(Guid postId)
        {
            await _postService.ComputeRockOns(postId, true);
            return Ok();
        }

        [HttpPost("post_disliked/{postId}")]
        public async Task<IActionResult> DecreasePostRockOns(Guid postId)
        {
            await _postService.ComputeRockOns(postId, false);
            return Ok();
        }

        [HttpGet("search_result")]
        public async Task<IActionResult> GetResultsBySearch([FromQuery] string search)
        {
            var _posts = await _postService.GetPostsBySearch(search);
            return _posts.Count != 0 ? Ok(_posts) : Ok();
        }

        [HttpGet("sort_newest")]
        public async Task<IActionResult> GetNewestPosts()
        {
            var _posts = await _postService.GetPosts();
            var _ordered_posts = _posts.OrderByDescending(x => x.CreatedDate);
            return Ok(_ordered_posts);
        }

        [HttpGet("sort_popular")]
        public async Task<IActionResult> GetPopularPosts()
        {
            var _posts = await _postService.GetPosts();
            var _ordered_posts = _posts.OrderByDescending(x => x.Views);
            return Ok(_ordered_posts);
        }
    }
}
