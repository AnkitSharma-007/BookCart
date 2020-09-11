using BookCart.Dto;
using System.Collections.Generic;

namespace BookCart.Interfaces
{
    public interface IOrderService
    {
        void CreateOrder(int userId, OrdersDto orderDetails);
        List<OrdersDto> GetOrderList(int userId);
    }
}
