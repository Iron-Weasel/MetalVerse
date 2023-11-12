using AutoMapper;
using MetalVerseBackend.Models.Dtos;
using MetalVerseBackend.Models;

namespace MetalVerseBackend.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Comment, CommentDto>();
            CreateMap<Post, PostWithCommentsDto>()
                .ForMember(dest => dest.Comments, opt => opt.MapFrom(src => src.Comments));
        }
    }
}
