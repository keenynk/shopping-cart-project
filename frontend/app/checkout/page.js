"use client";

import { useCart } from "../../context/CartContext";
import axios from "axios";
import Link from "next/link";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      await axios.post("http://localhost:5201/api/checkout", {
        items: cartItems.map(i => ({
          id: i.id,
          quantity: i.quantity
        }))
      });
      alert("ชำระเงินสำเร็จ");
      clearCart();
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการชำระเงิน");
    }
  };

    return (
    <div style={{ padding: 20 }}>
      <h1>ยืนยันการชำระเงิน</h1>

      {cartItems.length === 0 ? (
        <p>ไม่มีสินค้าในตะกร้า</p>
      ) : (
        <>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px"
          }}>
            {cartItems.map(item => (
              <div key={item.id} style={{
                width: "240px",
                borderRadius: "10px",
                backgroundColor: "#fff",
                color: "#000",
                padding: "12px",
                textAlign: "center",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
              }}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  width={180}
                  height={180}
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                />
                <h3>{item.name} - {item.price} x {item.quantity}</h3>
              </div>
            ))}
          </div>

          <hr style={{ margin: "30px 0" }} />
          <h2>รวมทั้งหมด: {total} บาท</h2>

          <button onClick={handleCheckout} style={{
            backgroundColor: "#2a9d8f",
            color: "#fff",
            fontSize: "16px",
            padding: "10px 24px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "10px"
          }}>
            ✅ ยืนยันชำระเงิน
          </button>
        </>
      )}

      {/* ✅ ปุ่มย้อนกลับ แสดงตลอด */}
      <div style={{ marginTop: 30 }}>
        <Link href={cartItems.length === 0 ? "/" : "/cart"}>
          <button style={{
            backgroundColor: "#888",
            color: "#fff",
            fontSize: "16px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}>
            ย้อนกลับไปหน้าแรก
          </button>
        </Link>
      </div>
    </div>
  );

}
