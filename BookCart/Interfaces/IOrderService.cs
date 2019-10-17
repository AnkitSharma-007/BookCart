using BookCart.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookCart.Interfaces
{
    public interface IOrderService
    {
        void CreateOrder(int userId, OrdersDto orderDetails);
        List<OrdersDto> GetOrderList(int userId);
    }
}
