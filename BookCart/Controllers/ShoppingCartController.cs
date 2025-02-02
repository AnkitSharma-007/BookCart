﻿using BookCart.Dto;
using BookCart.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookCart.Controllers
{
    [Route("api/[controller]")]
    public class ShoppingCartController(ICartService cartService, IBookService bookService) : Controller
    {
        readonly ICartService _cartService = cartService;
        readonly IBookService _bookService = bookService;

        /// <summary>
        /// Get the shopping cart for a user upon Login. If the user logs in for the first time, creates the shopping cart.
        /// </summary>
        /// <param name="oldUserId"></param>
        /// <param name="newUserId"></param>
        /// <returns>The count of items in shopping cart</returns>
        [Authorize]
        [HttpGet]
        [Route("SetShoppingCart/{oldUserId}/{newUserId}")]
        public int Get(int oldUserId, int newUserId)
        {
            _cartService.MergeCart(oldUserId, newUserId);
            return _cartService.GetCartItemCount(newUserId);
        }

        /// <summary>
        /// Get the list of items in the shopping cart
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet("{userId}")]
        public async Task<List<CartItemDto>> Get(int userId)
        {
            string cartid = _cartService.GetCartId(userId);
            return await Task.FromResult(_bookService.GetBooksAvailableInCart(cartid)).ConfigureAwait(true);
        }

        /// <summary>
        /// Add a single item into the shopping cart. If the item already exists, increase the quantity by one
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="bookId"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("AddToCart/{userId}/{bookId}")]
        public async Task<List<CartItemDto>> Post(int userId, int bookId)
        {
            _cartService.AddBookToCart(userId, bookId);
            return await Get(userId);
        }

        /// <summary>
        /// Reduces the quantity by one for an item in shopping cart
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="bookId"></param>
        /// <returns></returns>
        [HttpPut("{userId}/{bookId}")]
        public async Task<List<CartItemDto>> Put(int userId, int bookId)
        {
            _cartService.DeleteOneCartItem(userId, bookId);
            return await Get(userId);
        }

        /// <summary>
        /// Delete a single item from the cart 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="bookId"></param>
        /// <returns></returns>
        [HttpDelete("{userId}/{bookId}")]
        public async Task<List<CartItemDto>> Delete(int userId, int bookId)
        {
            _cartService.RemoveCartItem(userId, bookId);
            return await Get(userId);
        }

        /// <summary>
        /// Clear the shopping cart
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpDelete("{userId}")]
        public int Delete(int userId)
        {
            return _cartService.ClearCart(userId);
        }
    }
}
