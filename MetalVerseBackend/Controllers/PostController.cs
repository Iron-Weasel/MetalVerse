using MetalVerseBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace MetalVerseBackend.Controllers
{
    [ApiController]
    [Route("posts")]
    public class PostController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetPosts() 
        {
            return Ok();
        }

        [HttpGet("{postId}")]
        public IActionResult GetPost(Guid postId)
        {
            return Ok();
        }

        [HttpGet("{postId}/comments")]
        public IActionResult GetComments(Guid postId)
        {
            return Ok();
        }

        [HttpGet("{postId}/comments/{commentId}")]
        public IActionResult GetComment(Guid postId, Guid commentId)
        {
            return Ok();
        }

        [HttpPost("add_post")]
        public IActionResult AddPost(Post post)
        {
            return Ok();
        }

        [HttpPost("posts/{postId}/comments")]
        public IActionResult AddCommen(Comment comment)
        {
            return Ok();
        }
    }
}
