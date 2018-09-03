using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tenendus.HttpClient.Interfaces;
using Tenendus.Models;

namespace Tenendus.Controllers
{

  [Route("api/[controller]")]
  public class CustomerPortalController : Controller
  {
    private readonly IRestClient _restClient;


    public CustomerPortalController(IRestClient restClient)
    {
      _restClient = restClient;
    }

    // GET api/values
    [HttpGet]
    public IEnumerable<string> Get()
    {
      return new string[] { "Laptop", "Smart TV", "Smart Phone", "Tablet" };
    }

    // GET api/values/5
    [HttpGet("{id}")]
    public string Get(int id)
    {
      return "value";
    }

    //// POST api/values
    //[HttpPost]
    //[Produces("application/json")]
    //[EnableCors("AllowAnyOrigin")]
    //public Task<string> Post([FromBody]object data)
    //{
    //  return "value";

    //}


    // this is added just for testing offerapi calls
    private Dashboard CreateMockDataFortesting()
    {
      var offer = new Offer();
      offer.AssetOrAgreementId = "111";
      offer.AssetOrAgreementDescription = "test";
      var offers = new List<Offer>();
      offers.Add(offer);
      var opportunityRequest = new Dashboard();
      opportunityRequest.OpportunityId = "123";
      opportunityRequest.OpportunityDescription = "123";
      opportunityRequest.Offers = offers;

      return opportunityRequest;
    }


    [HttpPut("{id}")]
    public void Put(int id, [FromBody]string value)
    {
    }

    // DELETE api/values/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
