import { Flower } from "./flower";

export interface Category{
    category_id: number;
    name: string;
    description?: string;
    image_url?: string;
    flowers?: Flower[]
  };
  