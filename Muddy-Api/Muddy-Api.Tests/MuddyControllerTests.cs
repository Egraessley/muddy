using System;
using System.Net;
using System.Threading.Tasks;
using Xunit;

namespace Muddy_Api.Tests
{
    public class MuddyControllerTests
    {
        Uri _baseUri = new Uri("URL");

        [Fact]
        public async Task TestGetWeather()
        {
            using (var client = new TestClientProvider(_baseUri).HttpClient)
            {
            }
        }
    }
}
