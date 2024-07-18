// components/AuthComponent.tsx
import { useAuth } from '@/app/utils/authContext';
import React from 'react';


const AuthComponent = () => {
  const { authToken, login, logout } = useAuth();

  const handleLogin = () => {
    // Simulate login with a token (replace with actual authentication logic)
    const token = 'example_token';
    login(token);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {authToken ? (
        <div>
          <p>Logged in with token: {authToken}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default AuthComponent;
