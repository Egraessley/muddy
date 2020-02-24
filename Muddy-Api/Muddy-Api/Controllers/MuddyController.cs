using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Muddy_Api.Models;
using Newtonsoft.Json;

namespace Muddy_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MuddyController : ControllerBase
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly IConfiguration _configuration;

        public MuddyController(
            IHttpClientFactory clientFactory,
            IConfiguration configuration
            )
        {
            _configuration = configuration;
            _clientFactory = clientFactory;
        }
        [HttpGet("{latitude}/{longitude}")]
        public async Task<ActionResult> Get(string latitude,string longitude)
        {
            var url = $"{_configuration["DarkskyURL"]}{latitude},{longitude}";
            var request = new HttpRequestMessage(HttpMethod.Get,url);
            var client = _clientFactory.CreateClient();
            var response = await client.SendAsync(request);
            if(!response.IsSuccessStatusCode)
            {
                return BadRequest("Unable to access darksky");
            }
            var content = await response.Content.ReadAsAsync<dynamic>();
            var json = content["currently"];
            json["daily"] = content["daily"];

            return Ok(content);
        }
    }
}
