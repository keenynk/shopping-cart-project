using backend.Models;

namespace backend.Data
{
    public static class SeedData
    {
        public static void Initialize(ApplicationDbContext context)
        {
            if (!context.Products.Any())
            {
                context.Products.AddRange(
                    new Product { Name = "หมวก", Description = "หมวกสวย", Price = 199, Stock = 5 },
                    new Product { Name = "รองเท้า", Description = "ใส่สบาย", Price = 499, Stock = 8 }
                );
                context.SaveChanges();
            }
        }
    }
}
