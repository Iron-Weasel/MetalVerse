using MetalVerseBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace MetalVerseBackend.Controllers
{
    [ApiController]
    [Route("posts")]
    public class PostController : ControllerBase
    {
        private List<Post> _posts = new List<Post>();
        public PostController()
        {
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
            });
        }

        [HttpGet]
        public IActionResult GetPosts()
        {
            return Ok(_posts);
        }

        [HttpGet("{postId}")]
        public IActionResult GetPost(Guid postId)
        {
            return Ok(_posts.FirstOrDefault(x => x.Id == postId));
        }

        [HttpPost("add_post")]
        public IActionResult AddPost(Post post)
        {
            _posts.Add(post);
            return Ok(_posts);
        }
    }
}
