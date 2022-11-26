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
        public async Task<AppInfo> Get(int appId)
        {

            HttpResponseMessage response = await FetchAppInfo(appId);
            SteamAppInfo details = await ParseResponse(response);

            var data = details.data;
            return new AppInfo
            {
                Title = data.name,
                Description = data.short_description,
                Developer = data.developers.FirstOrDefault(),
                ReleaseDate = data.release_date.date,
                Rating = (decimal)data.metacritic.score / 100,
                CurrentPrice = data.is_free ? 0 : data.price_overview.final / 100,
                RetailPrice = data.is_free ? 0 : data.price_overview.initial / 100,
                HeaderImageUrl = data.header_image,
                LibraryImageUrl = $"https://steamcdn-a.akamaihd.net/steam/apps/{appId}/library_600x900_2x.jpg",
                ScreenshotUrls = data.screenshots.Select(s => s.path_full)
            };
        }

        private static async Task<SteamAppInfo> ParseResponse(HttpResponseMessage response)
        {
            var result = await response.Content.ReadFromJsonAsync<AppDetailsResponse>();
            if (result is null)
            {
                throw new Exception("Failed to parse response.");
            }

            var appInfo = result.First().Value;

            if (!appInfo.success)
            {
                throw new Exception("API call was unsuccessful.");
            }

            return appInfo;
        }

        private async Task<HttpResponseMessage> FetchAppInfo(int appId)
        {
            _logger.LogInformation("Fetching app id {appId}.", appId);

            var httpClient = new HttpClient();

            var response = await httpClient.GetAsync($"https://store.steampowered.com/api/appdetails?appids={appId}");

            response.EnsureSuccessStatusCode();

            return response;
        }
    }
}