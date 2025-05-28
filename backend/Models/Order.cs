namespace backend.Models
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public List<OrderItem> Items { get; set; } = new();
    }

    public class OrderItem
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } = ""; // ✅ แก้ตรงนี้
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
    }
}
