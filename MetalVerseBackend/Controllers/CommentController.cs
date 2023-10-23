using MetalVerseBackend.Models;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.Design;

namespace MetalVerseBackend.Controllers
{
    [ApiController]
    [Route("posts/{postId}")]
    public class CommentController : ControllerBase
    {
        [HttpGet("comments")]
        public IActionResult GetComments(Guid postId)
        {
            return Ok();
        }

        [HttpGet("comments/{commentId}")]
        public IActionResult GetPost(Guid postId, Guid commentId)
        {
            return Ok();
        }

        [HttpPost("comments/add_comment")]
        public IActionResult AddComment(Guid postId, Comment comment)
        {
            return Ok();
        }
    }
}
