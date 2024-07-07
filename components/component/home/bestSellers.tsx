"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Flower } from "@/app/types/flower";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

// Define the User type
interface User {
  username: string;
  // Add other user properties here as needed
}

// Define the JWT token type
interface JwtToken {
  userId: string;
  // Add other JWT token properties here as needed
}

const BestSellers = () => {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/flower");
        setFlowers(response.data);
      } catch (error) {
        console.error("Error fetching flowers:", error);
      }
    };

    fetchFlowers();

    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      try {
        const decodedToken = jwtDecode<JwtToken>(tokenFromStorage);
        fetchUserData(decodedToken.userId);
      } catch (error) {
        console.error("Error decoding token:", error);
        handleLogout();
      }
    } else {
      setUser(null);
    }
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const response = await axios.get(`/api/user/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  const handleAddToCart = () => {
    if (user) {
      router.push("/cart");
    } else {
      router.push("/auth?redirect=/cart");
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold mb-8 md:mb-10 lg:mb-12">
          Best Sellers
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 lg:gap-4 p-4">
          {flowers.slice(0, 4).map((flower) => (
            <Card
              key={flower.flower_id}
              className="rounded-lg overflow-hidden card-style"
            >
              <img
                src={flower.image_url || "/placeholder.svg"}
                alt={flower.name}
                className="w-full h-48 object-cover rounded-t-lg card-style"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-medium">{flower.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {flower.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-medium">
                    ${flower.price.toFixed(2)}
                  </span>
                  <Button
                    className="bg-black text-white px-4 py-2 rounded-lg flex items-center black-bg"
                    variant="outline"
                    onClick={handleAddToCart}
                  >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
