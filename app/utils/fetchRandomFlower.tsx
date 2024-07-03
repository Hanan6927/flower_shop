// utils/fetchRandomFlower.ts
import axios from 'axios';

export const fetchRandomFlower = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/flower'); // Adjust the endpoint as needed
    const flowers = response.data;
    if (flowers.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * flowers.length);
    return flowers[randomIndex];
  } catch (error) {
    console.error('Error fetching flowers:', error);
    return null;
  }
};
