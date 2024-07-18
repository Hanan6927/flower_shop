'use client'
// Import necessary components and hooks
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// Define interfaces for Flower and CartItem
interface Flower {
  flower_id: number;
  name: string;
  category: string;
  image_url: string;
  price: number;
}

interface CartItem {
  cart_id: number;
  quantity: number;
  flower: Flower; // Assuming a nested Flower object
}

// Define your Cart component
export function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]); // Specify CartItem type for cart state

  // Fetch cart data from API on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get<CartItem[]>("/api/cart"); // Specify the response type as CartItem[]
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, []);

  // Handler for removing items from cart
  const handleRemove = async (id: number) => {
    try {
      await axios.delete(`/api/cart/${id}`);
      setCart(cart.filter((item) => item.cart_id !== id)); // Ensure to use correct property for comparison
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Handler for changing quantity of items in cart
  const handleQuantityChange = async (id: number, quantity: number) => {
    try {
      await axios.put(`/api/cart/${id}`, { quantity });
      setCart(
        cart.map((item) =>
          item.cart_id === id ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Calculate subtotal of items in cart
  const subtotal = cart.reduce(
    (total, item) => total + item.quantity * item.flower.price,
    0
  );

  // Render UI
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-3 text-left">Remove</th>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Flower</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Quantity</th>
              <th className="px-4 py-3 text-right">Unit Price</th>
              <th className="px-4 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.cart_id} className="border-b">
                <td className="px-4 py-3">
                  <Checkbox
                    id={`remove-${item.cart_id}`}
                    onCheckedChange={() => handleRemove(item.cart_id)}
                  />
                </td>
                <td className="px-4 py-3">
                  <img
                    src={item.flower.image_url || "/placeholder.svg"}
                    alt={item.flower.name}
                    width={64}
                    height={64}
                    className="rounded-md"
                  />
                </td>
                <td className="px-4 py-3 font-medium">{item.flower.name}</td>
                <td className="px-4 py-3">{item.flower.category}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleQuantityChange(item.cart_id, item.quantity - 1)
                      }
                      disabled={item.quantity === 1}
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleQuantityChange(item.cart_id, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  ${item.flower.price.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-right">
                  ${(item.quantity * item.flower.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 grid gap-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Subtotal:</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">Total:</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <Button className="w-full">Proceed to Checkout</Button>
      </div>
    </div>
  );
}
