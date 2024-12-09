using BookCart.Dto;
using BookCart.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookCart.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class CheckOutController(IOrderService orderService) : Controller
    {
        readonly IOrderService _orderService = orderService;

        /// <summary>
        /// Checkout from shopping cart
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="checkedOutItems"></param>
        /// <returns></returns>
        [HttpPost("{userId}")]
        public IActionResult Post(int userId, [FromBody] Checkout checkedOutItems)
        {
            _orderService.CreateOrder(userId, checkedOutItems);
            return Ok();
        }
    }
}
