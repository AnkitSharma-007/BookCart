using BookCart.Models;

namespace BookCart.Dto
{
    public class CartItemDto
    {
        public Book Book { get; set; }
        public int Quantity { get; set; }
    }
}
