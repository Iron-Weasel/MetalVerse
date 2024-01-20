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
            Connected.Add(userId, Context.ConnectionId);
            return base.OnConnectedAsync();
        }
    }
}
