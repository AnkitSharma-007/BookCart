namespace BookCart.Dto
{
    public class AuthenticatedUser
    {
        public int UserId { get; set; }

        public string Username { get; set; } = string.Empty;

        public string UserTypeName { get; set; } = string.Empty;
    }
}
