import axios from 'axios';

export const getRandomCategory = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/categories');
    const categories = response.data;

    if (categories.length > 0) {
      const randomIndex = Math.floor(Math.random() * categories.length);
      return categories[randomIndex];
    }

    return null;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
};
