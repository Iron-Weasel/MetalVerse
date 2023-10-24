using MetalVerseBackend.Models;

namespace MetalVerseBackend.Interfaces
{
    public interface IInboxService
    {
        public void WriteMessage(Message message);
    }
}
