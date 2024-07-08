"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Category } from "@/app/types/category";

const OneCategory = () => {
  const [category, setCategory] = useState<Category>();

  useEffect(() => {
    const fetchRandomCategory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/categories"
        );
        const categories = response.data;

        if (categories.length > 0) {
          const randomIndex = Math.floor(Math.random() * categories.length);
          setCategory(categories[randomIndex]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchRandomCategory();
  }, []);

  return (
    <section className="relative h-96 overflow-hidden">
      {category ? (
        <>
          <img
            src={category.image_url || "/placeholder.svg"}
            alt={category.name}
            width={1920}
            height={1080}
            className="object-cover w-full h-full "
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent one-category to-black/50 flex items-center justify-center">
            <div className="text-center text-white space-y-4 p-4 md:p-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                {category.name}
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl">
                {category.description ||
                  "Discover our selection of affordable and beautiful flowers."}
              </p>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Shop Now
              </Link>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default OneCategory;
