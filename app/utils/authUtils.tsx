// utils/authUtils.ts

export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    // Add more robust token validation logic if needed
    return !!token; // Returns true if token exists, false otherwise
  };
  