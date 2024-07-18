'use client'
// Auth.tsx

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import authStore from "@/stores/authStore"; // Adjust import path as per your project structure
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation"; // Adjust import path as per your project structure
import { Button } from "@/components/ui/button"; // Adjust import path as per your project structure
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Adjust import path as per your project structure
import { Label } from "@/components/ui/label"; // Adjust import path as per your project structure
import { Input } from "@/components/ui/input"; // Adjust import path as per your project structure
import Select from "react-select"; // Adjust import path as per your project structure
import Link from "next/link"; // Adjust import path as per your project structure

const Auth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    authStore.fetchCountries(); // Fetch countries data on component mount
  }, []);

  const countryOptions = authStore.countries.map((country) => {
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
    const countryName = authStore.countries
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    authStore.setFormData(id as keyof typeof authStore.formData, value);
  };

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    authStore.setSignInData(id as keyof typeof authStore.signInData, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      ...authStore.formData,
      phone: authStore.selectedCountry
        ? `${authStore.selectedCountry.value}${authStore.formData.phone}`
        : authStore.formData.phone,
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
      router.refresh(); // Force page refresh
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed");
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", authStore.signInData);

      if (response.status !== 200) {
        throw new Error("Login failed");
      }

      const data = response.data;
      localStorage.setItem("token", data.token);
      alert("Login successful");
      router.push(redirect);
      router.refresh(); // Force page refresh
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
          {/* Google Sign-in button */}
          <div>
            <Button variant="outline" className="w-full black-bg">
              {/* Your Google sign-in button content */}
            </Button>
          </div>
          {/* Or continue with */}
          <div className="relative">
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          {/* Tabs for Sign up and Sign in */}
          <Tabs defaultValue="signup" className="space-y-6">
            <TabsList className="grid grid-cols-2 gap-2">
              <TabsTrigger value="signup">Sign up</TabsTrigger>
              <TabsTrigger value="signin">Sign in</TabsTrigger>
            </TabsList>
            <TabsContent value="signup">
              {/* Sign up form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Username field */}
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={authStore.formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                    required
                  />
                </div>
                {/* Email field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={authStore.formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                {/* Phone number field */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex items-center gap-2">
                    <Select
                      options={countryOptions}
                      value={authStore.selectedCountry}
                      onChange={(value) => authStore.setSelectedCountry(value as any)}
                      placeholder="Select country code"
                      className="w-full"
                      filterOption={filterOption}
                    />
                    <Input
                      id="phone"
                      type="tel"
                      value={authStore.formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      required
                      title="Please enter a valid phone number"
                    />
                  </div>
                </div>
                {/* Address field */}
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={authStore.formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                    required
                  />
                </div>
                {/* Password field */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={authStore.formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                    minLength={8}
                  />
                </div>
                {/* Submit button */}
                <div className="mt-4">
                  <Button type="submit" className="w-full black-bg">
                    Sign up
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="signin">
              {/* Sign in form */}
              <form className="space-y-4" onSubmit={handleSignIn}>
                {/* Email field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={authStore.signInData.email}
                    onChange={handleSignInChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                {/* Password field */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={authStore.signInData.password}
                    onChange={handleSignInChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                {/* Submit button */}
                <div className="mt-4">
                  <Button type="submit" className="w-full black-bg">
                    Sign in
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
        {/* Footer */}
        <div className="text-sm text-center text-muted-foreground">
          <span>
            Already have an account?{" "}
            <Link href="/login">
              Log in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default observer(Auth);
