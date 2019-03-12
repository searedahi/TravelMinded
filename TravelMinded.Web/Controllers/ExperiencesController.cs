using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Travel.Models;
using TravelMinded.Service;

namespace TravelMinded.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExperiencesController : ControllerBase
    {
        private TravelMindedRepository travelMindedService;
        
        public ExperiencesController() {
            travelMindedService = TravelMindedServiceFactory.CreateTravelMindedService();
        }


        // GET: api/Experience
        [HttpGet]
        [HttpGet("[action]")]
        public IEnumerable<IExperience> All()
        {
            var allExperiences = travelMindedService.GetExperiences();
            return allExperiences;
        }


        [HttpGet("[action]")]
        public IEnumerable<IExperience> AvailableAfter(int startDateIndex)
        {
            var allExperiences = travelMindedService.GetExperiences();
            return allExperiences;
        }
    }
}
