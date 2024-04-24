using BookCart.Dto;
using BookCart.Models;
using System.Threading.Tasks;

namespace BookCart.Interfaces
{
    public interface IUserService
    {
        AuthenticatedUser AuthenticateUser(UserLogin loginCredentials);
        Task<bool> RegisterUser(UserMaster userData);
        bool CheckUserNameAvailabity(string userName);

        Task<bool> isUserExists(int userId);
    }
}
