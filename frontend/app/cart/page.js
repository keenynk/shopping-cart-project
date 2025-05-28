"use client";

import { useCart } from "../../context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

    return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>ตะกร้าสินค้า</h1>

      {cartItems.length === 0 ? (
        <p>ยังไม่มีสินค้าที่เลือกไว้</p>
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
                <h3>{item.name} - {item.price} บาท x {item.quantity}</h3>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    backgroundColor: "#ccc",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginTop: "8px"
                  }}
                >
                  ลบสินค้า
                </button>
              </div>
            ))}
          </div>

          <hr style={{ margin: "30px 0" }} />
          <h2>รวมทั้งหมด: {total} บาท</h2>

          <Link href="/checkout">
            <button style={{
              backgroundColor: "#e63946",
              color: "#fff",
              fontSize: "16px",
              padding: "10px 24px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "10px"
            }}>
              🧾 ไปชำระเงิน
            </button>
          </Link>
        </>
      )}

      {/* ✅ ปุ่มย้อนกลับ แสดงตลอด */}
      <div style={{ marginTop: 30 }}>
        <Link href="/">
          <button style={{
            backgroundColor: "#888",
            color: "#fff",
            fontSize: "16px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}>
            ย้อนกลับ
          </button>
        </Link>
      </div>
    </div>
  );

}
