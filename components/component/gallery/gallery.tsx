"use client";
import { Flower } from "@/app/types/flower";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";


const GalleryPage = () => {
  try {
    const [flowers, setFlowers] = useState<Flower[]>([]);

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
    }, []);

    return (
      <div>
        <h1 className="text-3xl font-bold mb-4">Gallery</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 lg:gap-4 p-4">
          {flowers.map((flower) => (
            <Link href={`/gallery/${flower.flower_id}`}>
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
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p>Failed to load flowers. Please try again later.</p>
      </div>
    );
  }
};

export default GalleryPage;
