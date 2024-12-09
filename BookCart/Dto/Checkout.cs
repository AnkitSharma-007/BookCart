namespace BookCart.Dto
{
    public class Checkout
    {
        public required List<CartItemDto> OrderDetails { get; set; }
        public decimal CartTotal { get; set; }
    }
}
