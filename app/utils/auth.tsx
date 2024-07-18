// Auth.tsx
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/authContext';


const Auth = () => {
  const { login } = useAuth();
  const router = useRouter();

  // State for sign-in form
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  // Handle sign-in form submission
  const handleSignIn = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', signInData);

      if (response.status !== 200) {
        throw new Error('Login failed');
      }

      const { token } = response.data;
      login(token); // Update authentication state
      alert('Login successful');
      router.push('/'); // Redirect to home page after successful login
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed');
    }
  };

  // Your sign-in form JSX and other components...

  return (
    <div>
      {/* Your sign-in form JSX */}
      <form onSubmit={handleSignIn}>
        {/* Form fields and submit button */}
      </form>
    </div>
  );
};

export default Auth;
