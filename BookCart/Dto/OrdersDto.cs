namespace BookCart.Dto
{
    public class OrdersDto
    {
        public string OrderId { get; set; }
        public List<CartItemDto> OrderDetails { get; set; }
        public decimal CartTotal { get; set; }
        public DateTime OrderDate { get; set; }
    }
}
