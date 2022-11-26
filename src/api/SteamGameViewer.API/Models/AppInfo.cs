namespace SteamGameViewer.API.Models
{
    public class AppInfo
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? ReleaseDate { get; set; }
        public string? Developer { get; set; }
        public decimal Rating { get; set; }
        public decimal CurrentPrice { get; set; }
        public decimal RetailPrice { get; set; }
        public string? HeaderImageUrl { get; set; }
        public string? LibraryImageUrl { get; set; }
        public IEnumerable<string> ScreenshotUrls { get; set; } = new List<string>();
    }
}
