namespace backend.Models
{
    public class CheckoutRequest
    {
        public List<CartItem> Items { get; set; } = new();
    }

    public class CartItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
    }
}
