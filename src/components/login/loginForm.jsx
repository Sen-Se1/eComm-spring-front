"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios'

const LoginForm = () => {
  const router = useRouter();
  const [err, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (localStorage.getItem('user')) {
      router.push('/');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return setError('Please fill all the fields');
    }
    try {
      const response = await axios.post('http://localhost:3333/Client/login', {
        emailCl: email,
        passwordCl: password,
      });
      if (response.status === 200) {
        if (response.data.Error) {
          return setError(response.data.Error);
        }
        localStorage.setItem('user', JSON.stringify(response.data.Client));
        localStorage.setItem('userId', response.data.Client.id);
        router.push('/');
      }
    } catch (error) {
      return setError('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {err && <div className="mb-4 p-3 text-red-700 bg-red-200 border border-red-300 rounded">{err}</div>}
    <input 
      className="mb-4 border rounded p-3 text-lg" 
      type="email" 
      placeholder="Enter Your Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <input 
      className="mb-6 border rounded p-3 text-lg" 
      type="password" 
      placeholder="Enter Your Password" 
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button type="submit" className="text-lg text-white bg-blue-800 hover:bg-blue-700 p-3 rounded-lg font-bold transition duration-300 ease-in-out">
      Login
    </button>
  </form>
  );
};

export default LoginForm;
