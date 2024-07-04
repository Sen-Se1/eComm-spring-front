"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios'

const RegisterForm = () => {
  const router = useRouter();
  const [err, setError] = useState('')
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    if (localStorage.getItem('user')) {
      router.push('/');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName ||!lastName ||!address ||!phoneNumber ||!email ||!password) {
      return setError('Please fill all the fields');
    }
    
    try {
      const response = await axios.post(`${process.env.API_HOST}/Client/save`, {
        nomCl : firstName,
        prenomCl : lastName,
        adresseCl : address,
        telCl : phoneNumber,
        emailCl : email,
        passwordCl : password,
      });
      if (response.status === 200) {
        if (response.data.Error) {
          return setError(response.data.Error);
        }
        router.push('/login');
      }
    } catch (error) {
      return setError('Registration failed:', error);
    }
  };

  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {err && <div className="mb-4 p-3 text-red-700 bg-red-200 border border-red-300 rounded">{err}</div>}
    <input
      className="mb-4 border rounded p-3 text-lg"
      type="text"
      placeholder="Enter Your First Name"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
    />
    <input
      className="mb-4 border rounded p-3 text-lg"
      type="text"
      placeholder="Enter Your Last Name"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
    />
    <input
      className="mb-4 border rounded p-3 text-lg"
      type="text"
      placeholder="Enter Your Address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
    />
    <input
      className="mb-4 border rounded p-3 text-lg"
      type="number"
      placeholder="Enter Your Phone Number"
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
    />
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
      Register
    </button>
  </form>
  )
}

export default RegisterForm