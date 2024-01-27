using MetalVerseBackend.Models.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace MetalVerseBackend.Hubs
{
    public class CommunicationHub : Hub
    {
        public static readonly SortedDictionary<string, string> Connected = new SortedDictionary<string, string>();
        public override Task OnConnectedAsync()
        {
            //Console.WriteLine(Context.ConnectionId + " " + Context.UserIdentifier);
            var accessToken = Context.GetHttpContext().Request.Query["access_token"];
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadToken(accessToken) as JwtSecurityToken;
            string userId = token.Claims.First(claim => claim.Type == "unique_name").Value;
            if (Connected.ContainsKey(userId))
            {
                Connected[userId] = Context.ConnectionId;
            }
            else
            {
                Connected.Add(userId, Context.ConnectionId);
            }
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            var accessToken = Context.GetHttpContext().Request.Query["access_token"];
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadToken(accessToken) as JwtSecurityToken;
            string userId = token.Claims.First(claim => claim.Type == "unique_name").Value;
            Connected.Remove(userId);
            return base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(Guid ConversationId, MessageDto message, string sender, string receiver)
        {
            // Send only to the receiver, for the sender we shall only append to the FE, but have to get how the fuck we arrange the data.....
            if (Connected.ContainsKey(receiver))
            {
                await Clients.Client(Connected[receiver]).SendAsync("ReceiveMessage", message);
            }
            //Shall be added to the conversation from the repository, but how the fuck....maybe you are more awake then me
        }
    }
}
