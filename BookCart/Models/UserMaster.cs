namespace BookCart.Models
{
    public partial class UserMaster
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Gender { get; set; }
        public int UserTypeId { get; set; }
    }
}
