using BookCart.Dto;
using BookCart.Interfaces;
using BookCart.Models;
using Microsoft.EntityFrameworkCore;

namespace BookCart.DataAccess
{
    public class BookDataAccessLayer : IBookService
    {
        readonly BookDBContext _dbContext;

        public BookDataAccessLayer(BookDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<Book> GetAllBooks()
        {
            try
            {
                return _dbContext.Book.AsNoTracking().ToList();
            }
            catch
            {
                throw;
            }
        }

        public int AddBook(Book book)
        {
            try
            {
                _dbContext.Book.Add(book);
                _dbContext.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }

        public int UpdateBook(Book book)
        {
            try
            {
                Book oldBookData = GetBookData(book.BookId);

                if (oldBookData.CoverFileName != null)
                {
                    if (book.CoverFileName == null)
                    {
                        book.CoverFileName = oldBookData.CoverFileName;
                    }
                }

                _dbContext.Entry(book).State = EntityState.Modified;
                _dbContext.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }

        public Book GetBookData(int bookId)
        {
            try
            {
                Book book = _dbContext.Book.FirstOrDefault(x => x.BookId == bookId);
                if (book != null)
                {
                    _dbContext.Entry(book).State = EntityState.Detached;
                    return book;
                }
                return null;
            }
            catch
            {
                throw;
            }
        }

        public string DeleteBook(int bookId)
        {
            try
            {
                Book book = _dbContext.Book.Find(bookId);
                _dbContext.Book.Remove(book);
                _dbContext.SaveChanges();

                return (book.CoverFileName);
            }
            catch
            {
                throw;
            }
        }

        public List<Categories> GetCategories()
        {
            List<Categories> lstCategories = new List<Categories>();
            lstCategories = (from CategoriesList in _dbContext.Categories select CategoriesList).ToList();

            return lstCategories;
        }

        public List<Book> GetSimilarBooks(int bookId)
        {
            List<Book> lstBook = new List<Book>();
            Book book = GetBookData(bookId);

            lstBook = _dbContext.Book.Where(x => x.Category == book.Category && x.BookId != book.BookId)
                .OrderBy(u => Guid.NewGuid())
                .Take(5)
                .ToList();
            return lstBook;
        }

        public List<CartItemDto> GetBooksAvailableInCart(string cartID)
        {
            try
            {
                List<CartItemDto> cartItemList = new List<CartItemDto>();
                List<CartItems> cartItems = _dbContext.CartItems.Where(x => x.CartId == cartID).ToList();

                foreach (CartItems item in cartItems)
                {
                    Book book = GetBookData(item.ProductId);
                    CartItemDto objCartItem = new CartItemDto
                    {
                        Book = book,
                        Quantity = item.Quantity
                    };

                    cartItemList.Add(objCartItem);
                }
                return cartItemList;
            }
            catch
            {
                throw;
            }
        }

        public List<Book> GetBooksAvailableInWishlist(string wishlistID)
        {
            try
            {
                List<Book> wishlist = new List<Book>();
                List<WishlistItems> cartItems = _dbContext.WishlistItems.Where(x => x.WishlistId == wishlistID).ToList();

                foreach (WishlistItems item in cartItems)
                {
                    Book book = GetBookData(item.ProductId);
                    wishlist.Add(book);
                }
                return wishlist;
            }
            catch
            {
                throw;
            }
        }
    }
}
