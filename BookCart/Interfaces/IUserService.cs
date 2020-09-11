using BookCart.Models;

namespace BookCart.Interfaces
{
    public interface IUserService
    {
        UserMaster AuthenticateUser(UserMaster loginCredentials);
        int RegisterUser(UserMaster userData);
        bool CheckUserAvailabity(string userName);

        bool isUserExists(int userId);
    }
}
