using BookCart.Dto;
using BookCart.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookCart.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class CheckOutController(IOrderService orderService, ICartService cartService) : Controller
    {
        readonly IOrderService _orderService = orderService;
        readonly ICartService _cartService = cartService;

        /// <summary>
        /// Checkout from shopping cart
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="checkedOutItems"></param>
        /// <returns></returns>
        [HttpPost("{userId}")]
        public int Post(int userId, [FromBody]OrdersDto checkedOutItems)
        {
            _orderService.CreateOrder(userId, checkedOutItems);
            return _cartService.ClearCart(userId);
        }
    }
}
