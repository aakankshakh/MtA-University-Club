
import React, { useState } from 'react';
import styles from '@/styles/signIn.module.css'; // Import the module CSS file

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
    <div className={styles.signInContainer}>
      <h2 className={styles.signInHeader}>Sign In Page</h2>
      <form className={styles.signInForm}>
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
        <button type="button" onClick={handleSignIn} className={styles.signInButton}>
          Sign In
        </button>
        {error && <p className={styles.errorText}>{error}</p>}
      </form>
    </div>
  );
}
