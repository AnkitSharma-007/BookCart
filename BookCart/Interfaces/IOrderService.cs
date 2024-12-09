using BookCart.Dto;
using System.Collections.Generic;

namespace BookCart.Interfaces
{
    public interface IOrderService
    {
        void CreateOrder(int userId, Checkout orderDetails);
        List<OrdersDto> GetOrderList(int userId);
    }
}
