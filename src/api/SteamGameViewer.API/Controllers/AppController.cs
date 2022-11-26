using Microsoft.AspNetCore.Mvc;
using SteamGameViewer.API.Models;

namespace SteamGameViewer.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AppController : ControllerBase
    {
        private readonly ILogger<AppController> _logger;

        public AppController(ILogger<AppController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("{appId}")]
        public AppInfo Get(int appId)
        {
            _logger.LogInformation("Fetching app id {appId}.", appId);

            return new AppInfo
            {
                Title = "Team Fortress 2",
                Description = "Nine distinct classes provide a broad range of tactical abilities and personalities. Constantly updated with new game modes, maps, equipment and, most importantly, hats!",
                Developer = "Valve",
                ReleaseYear = 2007,
                ReleaseMonth = 10,
                ReleaseDay = 7,
                Rating = 0.93m,
                CurrentPrice = 0,
                RetailPrice = 19.99m,
                HeaderImageUrl = "https://cdn.cloudflare.steamstatic.com/steam/apps/440/header.jpg",
                LibraryImageUrl = "https://cdn.cloudflare.steamstatic.com/steam/apps/440/library_600x900_2x.jpg?t=1665425233",
                ScreenshotUrls = new[]
                {
                    "https://cdn.cloudflare.steamstatic.com/steam/apps/440/ss_ea21f7bbf4f79bada4554df5108d04b6889d3453.jpg",
                    "https://cdn.cloudflare.steamstatic.com/steam/apps/440/ss_e3aedb2ab36bba8cfe611b1e0eaa807e4bb2d742.jpg",
                    "https://cdn.cloudflare.steamstatic.com/steam/apps/440/ss_ee24a769dc1d81dcbd7b250d16530394adee4264.jpg",
                    "https://cdn.cloudflare.steamstatic.com/steam/apps/440/ss_9faaa506d91bf19dbb398e0c06a684b337f85f91.jpg",
                    "https://cdn.cloudflare.steamstatic.com/steam/apps/440/ss_7de978f22a7059151c31d0488dc57c5c7703c48b.jpg",
                    "https://cdn.cloudflare.steamstatic.com/steam/apps/440/ss_e79f2490af3247b4b0f8d412d437b72c321cfe3b.jpg",
                    "https://cdn.cloudflare.steamstatic.com/steam/apps/440/ss_8f28c75172e3d08e65222725202b82f58bfe7df7.jpg",
                    "https://cdn.cloudflare.steamstatic.com/steam/apps/440/0000002574.jpg",
                    "https://cdn.cloudflare.steamstatic.com/steam/apps/440/0000002575.jpg",
                    "https://cdn.cloudflare.steamstatic.com/steam/apps/440/0000002576.jpg",
                    "https://cdn.cloudflare.steamstatic.com/steam/apps/440/0000002577.jpg",
                    "https://cdn.cloudflare.steamstatic.com/steam/apps/440/0000002578.jpg",
                    "https://cdn.cloudflare.steamstatic.com/steam/apps/440/0000002579.jpg",
                    "https://cdn.cloudflare.steamstatic.com/steam/apps/440/0000002580.jpg",
                    "https://cdn.cloudflare.steamstatic.com/steam/apps/440/0000002581.jpg",
                }
            };
        }
    }
}