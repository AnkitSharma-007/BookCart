using BookCart.Interfaces;
using BookCart.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookCart.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        readonly IUserService _userService;
        readonly ICartService _cartService;

        public UserController(IUserService userService, ICartService cartService)
        {
            _userService = userService;
            _cartService = cartService;
        }

        /// <summary>
        /// Get the count of item in the shopping cart
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>The count of items in shopping cart</returns>
        [HttpGet("{userId}")]
        public int Get(int userId)
        {
            int cartItemCount = _cartService.GetCartItemCount(userId);
            return cartItemCount;
        }

        /// <summary>
        /// Check the availability of the username
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("validateUserName/{userName}")]
        public bool ValidateUserName(string userName)
        {
            return _userService.CheckUserNameAvailabity(userName);
        }

        /// <summary>
        /// Register a new user
        /// </summary>
        /// <param name="registrationData"></param>
        [HttpPost]
        public ActionResult Post([FromBody] UserRegistration registrationData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            UserMaster user = new()
            {
                FirstName = registrationData.FirstName,
                LastName = registrationData.LastName,
                Username = registrationData.Username,
                Password = registrationData.Password,
                Gender = registrationData.Gender,
                UserTypeId = 2
            };

            _userService.RegisterUser(user);

            return Ok();
        }
    }
}
