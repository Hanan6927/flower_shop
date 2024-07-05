// Header.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../../ui/button";
import jwtDecode, { JwtPayload } from "jwt-decode";

// Define the User type
interface User {
  username: string;
  // Add other user properties here as needed
}

const Header: React.FC = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        setUser({ username: decodedToken.username });
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  return (
    <header className="flex items-center h-16 px-4 md:px-6 border-b sticky top-0 z-50 bg-white">
      <Link href="/" className="flex items-center" prefetch={false}>
        <FlowerIcon className="h-6 w-6" />
        <span className="sr-only">Bloom Blossoms</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium ml-auto">
        <NavLink href="/" currentPath={pathname}>
          Home
        </NavLink>
        <NavLink href="/shop" currentPath={pathname}>
          Shop
        </NavLink>
        <NavLink href="/gallery" currentPath={pathname}>
          Gallery
        </NavLink>
        <NavLink href="/about" currentPath={pathname}>
          About Us
        </NavLink>
        <NavLink href="/contact" currentPath={pathname}>
          Contact
        </NavLink>
      </nav>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full">
          <SearchIcon className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
        {user ? (
          <>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Link href="/cart">
                <CartIcon className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <span>{user.username}</span>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Link href="/profile">
                  <UserIcon className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <Button variant="ghost" size="icon" className="rounded-full">
            <Link href="/auth">
              <UserIcon className="h-5 w-5" />
              <span className="sr-only">Sign In</span>
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  currentPath: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, currentPath, children }) => (
  <Link
    href={href}
    prefetch={false}
    className={`hover:underline underline-offset-4 ${
      currentPath === href ? "text-primary font-bold underline" : ""
    }`}
  >
    {children}
  </Link>
);

export default Header;

function FlowerIcon(props) {
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
      <circle cx="12" cy="12" r="3" />
      <path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5" />
      <path d="M12 7.5V9" />
      <path d="M7.5 12H9" />
      <path d="M16.5 12H15" />
      <path d="M12 16.5V15" />
      <path d="m8 8 1.88 1.88" />
      <path d="M14.12 9.88 16 8" />
      <path d="m8 16 1.88-1.88" />
      <path d="M14.12 14.12 16 16" />
    </svg>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CartIcon(props) {
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
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l.89 4.89L7.6 16.37a2 2 0 0 0 2 1.63h10.45a2 2 0 0 0 1.95-1.52L23 6H6" />
    </svg>
  );
}
