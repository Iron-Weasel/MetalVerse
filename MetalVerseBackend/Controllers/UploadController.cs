using MetalVerseBackend.Interfaces;
using MetalVerseBackend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

namespace MetalVerseBackend.Controllers
{
    [ApiController]
    [Route("upload-image")]
    public class UploadController : ControllerBase
    {
        private readonly IUploadService _uploadService;
        public UploadController(IUploadService uploadService)
        {
            _uploadService = uploadService;
        }

        [HttpPost]
        public async Task<IActionResult> Upload(IFormFile imageFile) 
        {
            if (imageFile.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(imageFile.ContentDisposition).FileName.Trim('"');
                var imageURL = await _uploadService.UploadAsync(imageFile.OpenReadStream(), fileName);
                return Ok(new {imageURL});
            }
            else return BadRequest();
        }
    }
}
