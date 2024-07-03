"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchRandomFlower } from "@/app/utils/fetchRandomFlower";

const OneFlower = () => {
  const [flower, setFlower] = useState<{
    flower_id: number;
    category_id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
  } | null>(null);

  useEffect(() => {
    const getFlower = async () => {
      const randomFlower = await fetchRandomFlower();
      setFlower(randomFlower);
    };

    getFlower();
  }, []);

  return (
    <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {flower && (
        <img
          src={flower.image_url}
          alt={flower.name}
          width={1920}
          height={1080}
          className="object-cover w-full h-full"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex items-center justify-center">
        <div className="text-center text-white space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {flower ? flower.name : "Loading..."}
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl">
            {flower
              ? flower.description
              : "Discover our selection of affordable and beautiful flowers."}
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
    </section>
  );
};

export default OneFlower;
