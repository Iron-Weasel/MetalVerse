﻿using MetalVerseBackend.Interfaces;
using MetalVerseBackend.Interfaces.Repositories;
using MetalVerseBackend.Models;
using MetalVerseBackend.Services;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.Design;

namespace MetalVerseBackend.Controllers
{
    [ApiController]
    [Route("posts/{postId}")]
    public class CommentController : ControllerBase
    {
        //private List<Post> _posts = new List<Post>();
        private readonly ICommentService _service;
        public CommentController(ICommentService service) 
        {
            /*
            _posts.Add(new Post()
            {
                Id = Guid.Parse("5d899972-6bfa-413d-bfa7-619fcfcd2706"),
                UserId = Guid.Parse("5d899972-6bfa-413d-bfa7-619fcfcd2706"),
                Title = "B",
                Description = "C",
                CommentsList = new List<Comment> { }
            });

            _posts.Add(new Post()
            {
                Id = Guid.Parse("67db0b44-fed7-49eb-9fa5-d291fe9cde64"),
                UserId = Guid.Parse("5d899972-6bfa-413d-bfa7-619fcfcd2706"),
                Title = "X",
                Description = "Y",
                Views = 3,
                RockOns = 4,
                CommentsList = new List<Comment> { }
            });

            var post = _posts.FirstOrDefault(x => x.Id == Guid.Parse("5d899972-6bfa-413d-bfa7-619fcfcd2706"));
            post.CommentsList.Add(
                new Comment()
                {
                    Id = Guid.Parse("67db0b44-fed7-49eb-9fa5-d291fe9cde64"),
                    Text = "AAAA"
                });
            post.CommentsList.Add(
                new Comment()
                {
                    Id = Guid.Parse("3fa85f64-5717-4562-b3fc-2c963f66afa6"),
                    Text = "BRUH"
                });
            */
            _service = service;
        }

        /*[HttpGet("comments")]
        public IActionResult GetComments(Guid postId)
        {
            //return Ok(_posts.FirstOrDefault(x => x.Id == postId).CommentsList);
        }

        [HttpGet("comments/{commentId}")]
        public IActionResult GetPost(Guid postId, Guid commentId)
        {
            var post = _posts.FirstOrDefault(x => x.Id == postId);
            //var comments = post.CommentsList;
            return Ok(comments.FirstOrDefault(a => a.Id == commentId));
        }
        */

        [HttpPost("comments/add_comment")]
        public async Task<IActionResult> AddComment(Comment comment)
        {
            await _service.AddComment(comment);
            return Ok();
        }

        [HttpPost("comment_liked/{commentId}")]
        public async Task<IActionResult> IncreaseCommentRockOns(Guid commentId)
        {
            await _service.ComputeRockOns(commentId, true);
            return Ok();
        }

        [HttpPost("comment_disliked/{commentId}")]
        public async Task<IActionResult> DecreaseCommentRockOns(Guid commentId)
        {
            await _service.ComputeRockOns(commentId, false);
            return Ok();
        }
    }
}
