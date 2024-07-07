using BookCart.Dto;
using BookCart.Interfaces;
using BookCart.Models;
using Microsoft.EntityFrameworkCore;

namespace BookCart.DataAccess
{
    public class UserDataAccessLayer(BookDBContext dbContext) : IUserService
    {
        readonly BookDBContext _dbContext = dbContext;

        public AuthenticatedUser AuthenticateUser(UserLogin loginCredentials)
        {
            AuthenticatedUser authenticatedUser = new();

            var userDetails = _dbContext.UserMaster.FirstOrDefault(
                u => u.Username == loginCredentials.Username && u.Password == loginCredentials.Password
                );

            if (userDetails != null)
            {

                authenticatedUser = new AuthenticatedUser
                {
                    Username = userDetails.Username,
                    UserId = userDetails.UserId,
                    UserTypeId = userDetails.UserTypeId
                };
            }
            return authenticatedUser;
        }

        public async Task<bool> RegisterUser(UserMaster userData)
        {
            bool isUserNameAvailable = CheckUserNameAvailabity(userData.Username);
            try
            {
                if (isUserNameAvailable)
                {
                    await _dbContext.UserMaster.AddAsync(userData);
                    await _dbContext.SaveChangesAsync();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                throw;
            }
        }

        public bool CheckUserNameAvailabity(string userName)
        {
            UserMaster user = _dbContext.UserMaster.FirstOrDefault(x => x.Username == userName);

            return user == null;
        }

        public async Task<bool> isUserExists(int userId)
        {
            UserMaster user = await _dbContext.UserMaster.FirstOrDefaultAsync(x => x.UserId == userId);

            return user != null;
        }
    }
}
