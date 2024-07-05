// app/shop/[id]/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

async function getFlowerById(id: string) {
  const res = await fetch(`${process.env.API_URL}/flower/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}

const FlowerPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const flower = await getFlowerById(id);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">{flower.name}</h1>
      <div className="flex flex-col p-10 md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={flower.image_url || "/placeholder.svg"}
            alt={flower.name}
            className="w-full h-[500px] object-cover rounded-lg shadow-md card-style"
          />
        </div>
        <div className="md:w-1/2 space-y-4">
          <Card className="rounded-lg overflow-hidden shadow-md">
            <CardContent className="p-4">
              <h2 className="text-2xl font-semibold mb-2">Description</h2>
              <p className="text-base text-muted-foreground">
                {flower.description}
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-lg overflow-hidden shadow-md">
            <CardContent className="p-4">
              <h2 className="text-2xl font-semibold mb-2">Details</h2>
              <ul className="list-disc list-inside">
                <li>Price: ${flower.price.toFixed(2)}</li>
                <li>Category: {flower.category}</li>
                <li>
                  Available: {flower.available ? "In Stock" : "Out of Stock"}
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FlowerPage;
