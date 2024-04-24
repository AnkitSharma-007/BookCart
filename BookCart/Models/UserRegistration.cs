using System.ComponentModel.DataAnnotations;

namespace BookCart.Models
{
    public class UserRegistration
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        [RegularExpression(@"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")]
        public string Password { get; set; }

        [Required]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }

        [Required]
        [RegularExpression("Male|Female")]
        public string Gender { get; set; }

        public UserRegistration()
        {
            FirstName = string.Empty;
            LastName = string.Empty;
            Gender = string.Empty;
            Username = string.Empty;
            Password = string.Empty;
            ConfirmPassword = string.Empty;
        }
    }
}
