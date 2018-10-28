using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TravelMinded.Service;

namespace TravelMinded.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExperienceController : ControllerBase
    {
        private TravelMindedService travelMindedService;
        
        public ExperienceController() {
            travelMindedService = TravelMindedServiceFactory.CreateTravelMindedService();
        }


        // GET: api/Experience
        [HttpGet]
        public IEnumerable<string> Get()
        {
            var allExperiences = travelMindedService.GetExperiences();

            return new string[] { "value1", "value2" };
        }

        // GET: api/Experience/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        //// GET: api/Experience/BodyGlove
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(string id)
        //{
        //    var companyId = 1; //Get from the string
        //    return Get(companyId);
        //}

        // POST: api/Experience
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Experience/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
