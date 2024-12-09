using BookCart.Dto;
using BookCart.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BookCart.Controllers
{
    [Route("api/[controller]")]
    public class LoginController(IConfiguration config, IUserService userService) : Controller
    {
        readonly IUserService _userService = userService;
        readonly IConfiguration _config = config;

        /// <summary>
        /// Login to the application
        /// </summary>
        /// <param name="login"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Login([FromBody] UserLogin login)
        {
            IActionResult response = Unauthorized();
            AuthenticatedUser authenticatedUser = _userService.AuthenticateUser(login);

            if (!string.IsNullOrEmpty(authenticatedUser.Username))
            {
                var tokenString = GenerateJSONWebToken(authenticatedUser);
                response = Ok(new
                {
                    token = tokenString,
                    userDetails = authenticatedUser,
                });
            }

            return response;
        }

        string GenerateJSONWebToken(AuthenticatedUser userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            List<Claim> userClaims = new()
            {
                new Claim(JwtRegisteredClaimNames.Name, userInfo.Username),
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.UserTypeName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Role,userInfo.UserTypeName),
                new Claim("userId", userInfo.UserId.ToString()),
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: userClaims,
                expires: DateTime.Now.AddHours(24),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
