"use client";
import { useState, useEffect, JSX, SVGProps } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import Link from "next/link";
import axios from "axios";
import { fetchCountries } from "@/app/utils/fetchCountries";
import { useRouter, useSearchParams } from "next/navigation";

const Auth = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  interface Country {
    cca2: string;
    idd?: {
      root: string;
      suffixes?: string[];
    };
    flags: {
      png: string;
    };
    name: {
      common: string;
    };
  }

  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<{
    value: string;
    label: JSX.Element;
  } | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      setCountries(data);
    };
    getCountries();
  }, []);

  const countryOptions = countries.map((country) => {
    const countryCode =
      country.idd &&
      country.idd.root &&
      country.idd.suffixes &&
      country.idd.suffixes[0]
        ? `${country.idd.root}${country.idd.suffixes[0]}`
        : "";

    return {
      value: countryCode,
      label: (
        <div className="flex items-center gap-2">
          <img
            src={country.flags.png}
            alt={country.name.common}
            width={24}
            height={24}
            className="rounded-full"
          />
          {`${countryCode} (${country.name.common})`}
        </div>
      ),
    };
  });

  const filterOption = (
    option: { value?: any; label?: any },
    inputValue: string
  ) => {
    const { label } = option;
    const countryName = countries
      .find(
        (country) =>
          `${country.idd?.root}${country.idd?.suffixes?.[0]}` === option.value
      )
      ?.name.common.toLowerCase();
    return (
      label.props.children[1]
        .toLowerCase()
        .includes(inputValue.toLowerCase()) ||
      option.value.includes(inputValue) ||
      countryName?.includes(inputValue.toLowerCase())
    );
  };

  const handleInputChange = (e: { target: { id: any; value: any } }) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSignInChange = (e: { target: { id: any; value: any } }) => {
    const { id, value } = e.target;
    setSignInData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const userData = {
      ...formData,
      phone: selectedCountry
        ? `${selectedCountry.value}${formData.phone}`
        : formData.phone,
    };

    try {
      const response = await axios.post("/api/user", userData);

      if (response.status !== 201) {
        throw new Error("Registration failed");
      }

      const data = response.data;
      localStorage.setItem("token", data.token);
      alert("Registration successful");
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed");
    }
  };

  const handleSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", signInData);

      if (response.status !== 200) {
        throw new Error("Login failed");
      }

      const data = response.data;
      localStorage.setItem("token", data.token);
      alert("Login successful");
      // Redirect to home page after successful login
      router.push(redirect);

      // Reload the home page to reflect the updated authentication state
      // window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed");
    }
  };
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Sign up or sign in
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Get started with our platform
          </p>
        </div>
        <div className="space-y-6">
          <div>
            <Button variant="outline" className="w-full black-bg">
              <ChromeIcon className="mr-2 h-5 w-5" />
              Sign in with Google
            </Button>
          </div>
          <div className="relative">
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Tabs defaultValue="signup" className="space-y-6">
            <TabsList className="grid grid-cols-2 gap-2">
              <TabsTrigger value="signup">Sign up</TabsTrigger>
              <TabsTrigger value="signin">Sign in</TabsTrigger>
            </TabsList>
            <TabsContent value="signup">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex items-center gap-2">
                    <Select
                      options={countryOptions}
                      value={selectedCountry}
                      onChange={setSelectedCountry}
                      placeholder="Select country code"
                      className="w-full"
                      filterOption={filterOption}
                    />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      required
                      title="Please enter a valid phone number in the format XXX-XXX-XXXX"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full black-bg">
                  Sign up
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signin">
              <form className="space-y-4" onSubmit={handleSignIn}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={signInData.email}
                    onChange={handleSignInChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={signInData.password}
                    onChange={handleSignInChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Link
                    href="#"
                    className="text-sm font-medium text-primary hover:underline"
                    prefetch={false}
                  >
                    Forgot password?
                  </Link>
                </div>
                <Button
                  variant="outline"
                  type="submit"
                  className="w-full black-bg"
                >
                  Sign in
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
export default Auth;
function ChromeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}
