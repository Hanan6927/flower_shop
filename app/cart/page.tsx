"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Flower {
  flower_id: number;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
}

interface CartItem {
  cart_id: number;
  user_id: number;
  flower: Flower; // Assuming each cart item includes a Flower object
  quantity: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("/api/cart");
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cartItems.map((item) => (
            <div key={item.cart_id} className="p-4 border rounded-md">
              <img
                src={item.flower.image_url || "/placeholder.svg"}
                alt={item.flower.name}
                className="w-20 h-20 object-cover rounded"
              />
              <h3 className="text-lg font-medium mt-2">{item.flower.name}</h3>
              <p className="text-sm text-gray-500">{item.flower.description}</p>
              <p className="text-lg font-bold mt-2">
                ${item.flower.price.toFixed(2)}
              </p>
              <p className="text-sm mt-2">Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
