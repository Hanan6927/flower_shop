import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const ShopByOccasion = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container">
        <h2 className="text-2xl text-center md:text-3xl lg:text-4xl font-bold mb-8 md:mb-10 lg:mb-12">
          Shop by Occasion
        </h2>
        <div className="flex justify-around p-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          <Card className="rounded-lg overflow-hidden">
            <img
              src="/placeholder.svg"
              alt="Flower 1"
              width={500}
              height={500}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <h3 className="text-lg font-medium">Birthday</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Celebrate with a vibrant bouquet of flowers.
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-medium">$39.99</span>
                <Button variant="ghost" size="icon">
                  <PlusIcon className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg overflow-hidden">
            <img
              src="/placeholder.svg"
              alt="Flower 2"
              width={500}
              height={500}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <h3 className="text-lg font-medium">Anniversary</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Show your love with a timeless bouquet.
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-medium">$49.99</span>
                <Button variant="ghost" size="icon">
                  <PlusIcon className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg overflow-hidden">
            <img
              src="/placeholder.svg"
              alt="Flower 3"
              width={500}
              height={500}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <h3 className="text-lg font-medium">Sympathy</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Express your condolences with a thoughtful bouquet.
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-medium">$59.99</span>
                <Button variant="ghost" size="icon">
                  <PlusIcon className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg overflow-hidden">
            <img
              src="/placeholder.svg"
              alt="Flower 4"
              width={500}
              height={500}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <h3 className="text-lg font-medium">Valentine's Day</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Celebrate love with a romantic bouquet.
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ShopByOccasion;
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
