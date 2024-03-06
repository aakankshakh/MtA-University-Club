
import React, { useState } from 'react';
import styles from '@/styles/signUp.module.css'; // Import the module CSS file

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          confirmEmail,
          password,
          confirmPassword,
        }),
      });

      if (response.ok) {
        // Registration successful
        console.log('Successfully signed up!');
        // Reset the form and error state
        setName('');
        setEmail('');
        setConfirmEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
      } else {
        // Registration failed
        const data = await response.json();
        setError(data.error || 'Sign-up failed.');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <h2 className={styles.signUpHeader}>Sign Up Page</h2>
      <form className={styles.signUpForm}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </label>
        <br />
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
          Confirm Email:
          <input
            type="email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            placeholder="Confirm your email"
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
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
          />
        </label>
        <br />
        <button type="button" onClick={handleSignUp} className={styles.signUpButton}>
          Sign Up
        </button>
        {error && <p className={styles.errorText}>{error}</p>}
      </form>
    </div>
  );
}
