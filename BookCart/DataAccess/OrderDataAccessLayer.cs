using BookCart.Dto;
using BookCart.Interfaces;
using BookCart.Models;
using System.Text;

namespace BookCart.DataAccess
{
    public class OrderDataAccessLayer(BookDBContext dbContext) : IOrderService
    {
        readonly BookDBContext _dbContext = dbContext;

        public void CreateOrder(int userId, Checkout orderDetails)
        {
            try
            {
                StringBuilder orderid = new StringBuilder();
                orderid.Append(CreateRandomNumber(3));
                orderid.Append('-');
                orderid.Append(CreateRandomNumber(6));

                CustomerOrders customerOrder = new()
                {
                    OrderId = orderid.ToString(),
                    UserId = userId,
                    DateCreated = DateTime.Now.Date,
                    CartTotal = orderDetails.CartTotal
                };
                _dbContext.CustomerOrders.Add(customerOrder);
                _dbContext.SaveChanges();

                foreach (CartItemDto order in orderDetails.OrderDetails)
                {
                    CustomerOrderDetails productDetails = new()
                    {
                        OrderId = orderid.ToString(),
                        ProductId = order.Book.BookId,
                        Quantity = order.Quantity,
                        Price = order.Book.Price
                    };
                    _dbContext.CustomerOrderDetails.Add(productDetails);
                    _dbContext.SaveChanges();
                }
            }
            catch
            {
                throw;
            }
        }

        public List<OrdersDto> GetOrderList(int userId)
        {
            List<OrdersDto> userOrders = new();
            List<string> userOrderId = new();

            userOrderId = _dbContext.CustomerOrders.Where(x => x.UserId == userId)
                .Select(x => x.OrderId).ToList();

            foreach (string orderid in userOrderId)
            {
                var customerOrder = _dbContext.CustomerOrders.FirstOrDefault(x => x.OrderId == orderid);
                if (customerOrder == null) continue;

                OrdersDto order = new()
                {
                    OrderId = orderid,
                    CartTotal = customerOrder.CartTotal,
                    OrderDate = customerOrder.DateCreated,
                    OrderDetails = []
                };

                List<CustomerOrderDetails> orderDetail = _dbContext.CustomerOrderDetails.Where(x => x.OrderId == orderid).ToList();

                foreach (CustomerOrderDetails customerOrderDetail in orderDetail)
                {
                    var book = _dbContext.Book.FirstOrDefault(x => x.BookId == customerOrderDetail.ProductId && customerOrderDetail.OrderId == orderid);
                    if (book == null) continue;

                    CartItemDto item = new()
                    {
                        Book = new Book
                        {
                            BookId = customerOrderDetail.ProductId,
                            Title = book.Title,
                            Price = customerOrderDetail.Price
                        },
                        Quantity = customerOrderDetail.Quantity
                    };

                    order.OrderDetails.Add(item);
                }
                userOrders.Add(order);
            }
            return userOrders.OrderByDescending(x => x.OrderDate).ToList();
        }

        int CreateRandomNumber(int length)
        {
            Random rnd = new();
            return rnd.Next(Convert.ToInt32(Math.Pow(10, length - 1)), Convert.ToInt32(Math.Pow(10, length)));
        }
    }
}
