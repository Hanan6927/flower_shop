// app/shop/[id]/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

async function getCategoryById(id: string) {
  const res = await fetch(`${process.env.API_URL}/categories/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}

const CategoryPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const category = await getCategoryById(id);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 lg:gap-4 p-4">
        {category.flowers.map((flower: any) => (
          <Card key={flower.flower_id} className="rounded-lg overflow-hidden">
            <img
              src={flower.image_url || "/placeholder.svg"}
              alt={flower.name}
              className="w-full h-48 object-cover rounded-t-lg"
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
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
