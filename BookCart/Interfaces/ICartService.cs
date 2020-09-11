namespace BookCart.Interfaces
{
    public interface ICartService
    {
        void AddBookToCart(int userId, int bookId);
        void RemoveCartItem(int userId, int bookId);
        void DeleteOneCartItem(int userId, int bookId);
        int GetCartItemCount(int userId);
        void MergeCart(int tempUserId, int permUserId);
        int ClearCart(int userId);
        string GetCartId(int userId);
    }
}
