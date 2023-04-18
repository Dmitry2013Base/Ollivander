using Development.Context;
using Development.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Development.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin, Analyst")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class StatisticController : ControllerBase
    {
        private readonly DatabaseContext _databaseContext;


        public StatisticController(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }


        [HttpPost("payment")]
        public IEnumerable<dynamic> GetPayment([FromBody] StatisticPrises statistic)
        {
            return _databaseContext.Orders!
                .Where(e => e.Status!.Id == statistic.Status && e.DateChange >= statistic.DateStart && e.DateChange <= statistic.DateFinish)
                .GroupBy(i => (statistic.Group) ? i.DateChange.Month : i.DateChange.Year)
                .Select(e => new { e.Key, Prises = e.Sum(e => e.Price) });
        }

        [HttpPost("users")]
        public IEnumerable<dynamic> GetUsers([FromBody] StatisticPrises statistic)
        {
            return _databaseContext.Users
                .Where(e => e.Created >= statistic.DateStart && e.Created <= statistic.DateFinish)
                .GroupBy(i => (statistic.Group) ? i.Created.Month : i.Created.Year)
                .Select(e => new { e.Key, Users = e.Count() });
        }

        [HttpPost("product")]
        public IEnumerable<dynamic> GetProduct([FromBody] StatisticPrises statistic)
        {
            return _databaseContext.Orders!
                .Where(e => e.Status!.Id == statistic.Status && e.Created >= statistic.DateStart && e.Created <= statistic.DateFinish)
                .GroupBy(e => e.Product!.Name)
                .Select(e => new { e.Key, Count = e.Count() })
                .OrderByDescending(e => e.Count)
                .Take(statistic.Limit);
        }
    }
}
