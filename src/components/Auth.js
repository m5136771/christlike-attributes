import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

// TODO: Add Phone Sign In
// TODO: Add Facebook Sign In
// TODO: Add Google Sign In
// TODO: Add Apple Sign In (Requires Apple Developer Account)

// TODO Add Password Reset

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleRegister = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        email: email,
        password: password,
      });
      console.log('User created:', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating user:', error);
      setError(error.message);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (isLogin) {
      handleLogin(email, password);
    } else {
      handleRegister(email, password);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
        <h1 className="text-xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button
          onClick={toggleMode}
          className="mt-4 text-sm text-blue-600 hover:underline"
        >
          {isLogin ? 'Create new account' : 'Back to login'}
        </button>
      </div>
    </div>
  );
};

export default Auth;