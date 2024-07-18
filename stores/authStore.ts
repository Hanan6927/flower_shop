// authStore.ts

import { makeAutoObservable } from "mobx";
import { fetchCountries } from "@/app/utils/fetchCountries"; // Adjust import path as per your project structure

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

class AuthStore {
  countries: Country[] = [];
  selectedCountry: { value: string; label: JSX.Element } | null = null;
  formData = {
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  };
  signInData = {
    email: "",
    password: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  async fetchCountries() {
    try {
      const data = await fetchCountries(); // Implement fetchCountries function as per your actual implementation
      this.countries = data;
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }

  setSelectedCountry(country: { value: string; label: JSX.Element }) {
    this.selectedCountry = country;
  }

  setFormData(id: keyof typeof AuthStore.prototype.formData, value: string) {
    this.formData[id] = value;
  }

  setSignInData(id: keyof typeof AuthStore.prototype.signInData, value: string) {
    this.signInData[id] = value;
  }
}

export default new AuthStore();
