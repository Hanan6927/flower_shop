import React from "react";

const HeroSection = () => {
  return (
    <section className="relative h-96 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1528834342297-fdefb9a5a92b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D"
        alt="Beautiful Flower"
        width={1920}
        height={1080}
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex items-center justify-center">
        <div className="text-center text-white space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Welcome to Our Flower Shop
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl">
            Discover the Beauty of Nature with Our Exquisite Flowers
          </p>
          <a
            href="#"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
