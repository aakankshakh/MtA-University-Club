import React, { useState } from 'react';
import { Hamburger } from '@/components/hamburger-menu';

const hamburgerMenuItems = [
  { label: 'Home', link: '/' },
  { label: 'View Menu', link: '/view-menu' },
  { label: 'Sign in', link: '/sign-in' },
  { label: 'Sign up', link: '/sign-up' },
  ];


export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await fetch('/api/authApi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Authentication successful
        console.log('Successfully signed in!');
        // Reset the form and error state
        setEmail('');
        setPassword('');
        setError('');
      } else {
        // Authentication failed
        const data = await response.json();
        setError(data.error || 'Sign-in failed.');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <header>
        {/** should have the hamburger menu icon... */}
      </header>
      <h2 className="text-3xl font-bold mb-4">Sign In</h2>
      <form className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="button"
          onClick={handleSignIn}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign In
        </button>
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </form>
    </div>
  );
}
