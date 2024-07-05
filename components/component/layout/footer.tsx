import React from "react";

const Footer = () => {
  return (
    <footer className="bg-silver footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 footer">
        <div className="md:flex md:justify-between md:items-center">
          {/* Left column */}
          <div className="md:flex-shrink-0">
            <a href="/" className="flex items-center">
              <img className="h-10 w-auto sm:h-12" src="/logo.svg" alt="Logo" />
              <span className="ml-2 text-lg font-bold tracking-wide text-white uppercase">
                Flower Delivery
              </span>
            </a>
          </div>

          {/* Middle column */}
          <div className="mt-8 md:mt-0 md:ml-10 space-y-8">
            <div>
              <h2 className="text-lg leading-6 font-medium text-white">
                Contact Us
              </h2>
              <div className="mt-4 space-y-4">
                <p className="text-base text-gray-300">123 Flower Street</p>
                <p className="text-base text-gray-300">Springfield, USA</p>
                <p className="text-base text-gray-300">
                  info@flowerdelivery.com
                </p>
                <p className="text-base text-gray-300">1-800-FLOWERS</p>
              </div>
            </div>
            <div>
              <h2 className="text-lg leading-6 font-medium text-white">
                Connect With Us
              </h2>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    {/* Facebook icon */}
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    {/* Twitter icon */}
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    {/* Instagram icon */}
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="mt-8 md:mt-0 md:ml-10 space-y-8">
            <div>
              <h2 className="text-lg leading-6 font-medium text-white">
                Our Services
              </h2>
              <div className="mt-4 space-y-4">
                <p className="text-base text-gray-300">Wedding Flowers</p>
                <p className="text-base text-gray-300">Event Decor</p>
                <p className="text-base text-gray-300">Gift Bouquets</p>
                <p className="text-base text-gray-300">Delivery Options</p>
              </div>
            </div>
            <div>
              <h2 className="text-lg leading-6 font-medium text-white">
                Legal
              </h2>
              <div className="mt-4 space-y-4">
                <a
                  href="#"
                  className="text-base text-gray-300 hover:text-white"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-base text-gray-300 hover:text-white"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <p className="text-base text-gray-300">
            &copy; 2024 Flower Delivery. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-4 md:mt-0 md:ml-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">Facebook</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {/* Facebook icon */}
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">Twitter</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {/* Twitter icon */}
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">Instagram</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {/* Instagram icon */}
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
