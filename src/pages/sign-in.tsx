
import React, { useState } from 'react';

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Set height to full viewport height for vertical centering
      }}
    >
      <h2 style={{ marginBottom: '16px' }}>Sign In Page</h2>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </label>
        <br />
        <button
          type="button"
          onClick={handleSignIn}
          style={{
            marginTop: '16px',
            padding: '8px 16px',
            backgroundColor: '#007bff', // Example background color
            color: '#fff', // Example text color
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Sign In
        </button>
        {error && (
          <p
            style={{
              color: 'red',
              marginTop: '8px',
            }}
          >
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
