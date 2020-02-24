using System;
using System.Net.Http;
using Muddy_Api.Tests;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;

namespace Muddy_Api
{
    public class TestClientProvider
    {
        public TestClientProvider(Uri baseUri)
        {
            var server = new TestServer(new WebHostBuilder().UseStartup<Startup>());
            var client = server.CreateClient();
            client.BaseAddress = baseUri;
            HttpClient = client;
        }

        public HttpClient HttpClient { get; }
    }
}