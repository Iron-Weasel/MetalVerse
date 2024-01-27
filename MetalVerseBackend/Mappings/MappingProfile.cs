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
            CreateMap<Conversation, ConversationDto>()
                .ForMember(dest => dest.LastMessage, opt => opt.MapFrom(src =>
                    src.Messages.OrderByDescending(m => m.DateTime).FirstOrDefault()));
            CreateMap<User, UserDto>()
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.Username));
        }
    }
}
