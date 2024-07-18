import axios from 'axios';

export const signUp = async (formData: FormData) => {
  try {
    const response = await axios.post('/api/user', formData);
    if (response.status === 201) {
      const data = response.data;
      localStorage.setItem('token', data.token);
      return data.user; // Adjust response handling based on your API
    } else {
      throw new Error('Registration failed');
    }
  } catch (error) {
    throw new Error('Registration failed');
  }
};

export const signIn = async (formData: FormData) => {
  try {
    const response = await axios.post('/api/authenticate', formData);
    if (response.status === 200) {
      const data = response.data;
      localStorage.setItem('token', data.token);
      return data.user; // Adjust response handling based on your API
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    throw new Error('Login failed');
  }
};
