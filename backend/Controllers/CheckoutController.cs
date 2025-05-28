using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CheckoutController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CheckoutController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult ProcessCheckout([FromBody] CheckoutRequest request)
        {
            if (request.Items == null || !request.Items.Any())
                return BadRequest("ไม่มีรายการสินค้า");

            foreach (var item in request.Items)
            {
                var product = _context.Products.FirstOrDefault(p => p.Id == item.Id);
                if (product == null)
                    return NotFound($"ไม่พบสินค้า ID {item.Id}");

                if (product.Stock < item.Quantity)
                    return BadRequest($"สินค้าคงเหลือไม่พอ: {product.Name}");

                product.Stock -= item.Quantity; // ลดจำนวน
            }

            var order = new Order
            {
                Items = request.Items.Select(i => new OrderItem
                {
                    ProductId = i.Id,
                    ProductName = "N/A",
                    Quantity = i.Quantity,
                    UnitPrice = 0
                }).ToList()
            };

            _context.Orders.Add(order);
            _context.SaveChanges();

            return Ok(new { message = "Checkout สำเร็จ", orderId = order.Id });
        }
    }
}
