// utils/fetchCountries.ts
import axios from 'axios';

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

export const fetchCountries = async (): Promise<Country[]> => {
  const response = await axios.get('https://restcountries.com/v3.1/all');
  return response.data;
};
