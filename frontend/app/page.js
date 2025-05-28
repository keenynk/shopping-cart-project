"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState([]);
  const { cartItems, addToCart, decreaseQuantity } = useCart();

  useEffect(() => {
    axios.get("http://localhost:5201/api/products")
      .then(res => setProducts(res.data));
  }, []);

  const getQuantityInCart = (productId) => {
    const item = cartItems.find(i => i.id === productId);
    return item ? item.quantity : 0;
  };

    return (
    <div style={{ padding: 20 }}>
      <h1>สินค้า</h1>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'flex-start'
      }}>
        {products.map(p => {
          const quantity = getQuantityInCart(p.id);

          return (
            <div key={p.id} style={{
              width: '200px',
              borderRadius: '12px',
              backgroundColor: '#fff',
              padding: '12px',
              color: '#000',
              textAlign: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}>
              <img
                src={p.imageUrl}
                alt={p.name}
                width="150"
                height="150"
                style={{ objectFit: 'cover', borderRadius: '8px' }}
              />
              <br />
              <strong>{p.name}</strong> - {p.price} บาท
              <p>คงเหลือในสต็อก: {p.stock} ชิ้น</p>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                marginTop: '5px'
              }}>
                <button
                  onClick={() => decreaseQuantity(p.id)}
                  disabled={quantity === 0}
                  style={{
                    fontSize: '20px',
                    padding: '4px 12px',
                    backgroundColor: '#555',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  ➖
                </button>
                <span style={{ fontSize: '16px' }}>{quantity}</span>
                <button
                  onClick={() => addToCart(p)}
                  disabled={quantity >= p.stock}
                  style={{
                    fontSize: '20px',
                    padding: '4px 12px',
                    backgroundColor: '#555',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  ➕
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{
        marginTop: 40,
        textAlign: 'center'
      }}>
        <Link href="/cart">
          <button style={{
            backgroundColor: '#e63946',
            color: '#fff',
            fontSize: '20px',
            padding: '14px 30px',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0px 4px 10px rgba(0,0,0,0.25)'
          }}>
            🛒 ไปที่ตะกร้าสินค้า
          </button>
        </Link>
      </div>
    </div>
  );

}
