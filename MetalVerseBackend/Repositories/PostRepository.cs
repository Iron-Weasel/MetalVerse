using MetalVerseBackend.Data;
using MetalVerseBackend.Interfaces.Repositories;
using MetalVerseBackend.Models;

namespace MetalVerseBackend.Repositories
{
    public class PostRepository : RepositoryBase<Post>, IPostRepository
    {
        public PostRepository(ApplicationDbContext _ApplicationDbContext) : base(_ApplicationDbContext) { }
        public void CreatePost(Post post) => Create(post);

        public Post GetPost(Guid postId) => FindByCondition(x => x.Id == postId, false).First();

        public IEnumerable<Post> GetPosts(bool trackChanges) => FindAll(trackChanges).ToList();

        public IEnumerable<Post> GetPostsByString(string search, bool trackChanges) => FindByCondition(x => x.Title.Contains(search), trackChanges).ToList();
    }
}
