"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Category } from "@/app/types/category";

const ShopPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="container py-12">
      <h2 className="text-2xl text-center md:text-3xl lg:text-4xl font-bold mb-8">
        Shop by Category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div key={category.category_id} className="space-y-4">
            <Card className="rounded-lg overflow-hidden">
              <img
                src={category.image_url || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-medium">{category.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {category.description}
                </p>
                <Link
                  href={`/shop/${category.category_id}`}
                  className="text-primary hover:underline"
                >
                  View Flowers
                </Link>
              </CardContent>
            </Card>
            {/* <div className="space-y-4">
              {category.flowers!.map((flower) => (
                <Card
                  key={flower.flower_id}
                  className="rounded-lg overflow-hidden"
                >
                  <img
                    src={flower.image_url || "/placeholder.svg"}
                    alt={flower.name}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4">
                    <h4 className="text-lg font-medium">{flower.name}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {flower.description}
                    </p>
                    <Button className="mt-2">Add to Cart</Button>
                  </CardContent>
                </Card>
              ))}
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
