using MetalVerseBackend.Data;
using MetalVerseBackend.Interfaces.Repositories;

namespace MetalVerseBackend.Repositories
{
    public class RepositoryManager : IRepositoryManager
    {
        private ApplicationDbContext _applicationContext;
        private IRockStreamRepository _streamRepository;
        private IAnnouncementRepository _announcementRepository;
        private IFutureEventRepository _futureEventRepository;
        private IUserRepository _userRepository;
        private IPostRepository _postRepository;
        private ICommentRepository _commentRepository;

        public RepositoryManager(ApplicationDbContext applicationContext)
        {
            _applicationContext = applicationContext;
        }


        public IRockStreamRepository Streams
        {
            get
            {
                if (_streamRepository == null)
                    _streamRepository = new RockStreamRepository(_applicationContext);
                return _streamRepository;
            }
        }

        public IAnnouncementRepository Announcements
        {
            get
            {
                if (_announcementRepository == null)
                    _announcementRepository = new AnnouncementRepository(_applicationContext);
                return _announcementRepository;
            }
        }

        public IFutureEventRepository FutureEvents
        {
            get
            {
                if (_futureEventRepository == null)
                    _futureEventRepository = new FutureEventRepository(_applicationContext);
                return _futureEventRepository;
            }
        }

        public IUserRepository Users
        {
            get
            {
                if (_userRepository == null)
                    _userRepository = new UserRepository(_applicationContext);
                return _userRepository;
            }
        }

        public IPostRepository Posts
        {
            get
            {
                if (_postRepository == null)
                    _postRepository = new PostRepository(_applicationContext);
                return _postRepository;
            }
        }
        public ICommentRepository Comments
        {
            get
            {
                if (_commentRepository == null)
                    _commentRepository = new CommentRepository(_applicationContext);
                return _commentRepository;
            }
        }

        public void Save() => _applicationContext.SaveChanges();
    }
}
