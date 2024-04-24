namespace BookCart.Dto
{
    public class AuthenticatedUser
    {
        public int UserId { get; set; }

        public string Username { get; set; } = string.Empty;

        public int UserTypeId { get; set; } = 2;
    }
}
