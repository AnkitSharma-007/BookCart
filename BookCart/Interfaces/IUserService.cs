using BookCart.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookCart.Interfaces
{
    public interface IUserService
    {
        UserMaster AuthenticateUser(UserMaster loginCredentials);
        int RegisterUser(UserMaster userData);
        bool CheckUserAvailabity(string userName);
    }
}
