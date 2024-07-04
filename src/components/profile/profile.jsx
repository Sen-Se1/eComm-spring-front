"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    prenomCl: '',
    nomCl: '',
    adresseCl: '',
    telCl: '',
    emailCl: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const id = localStorage.getItem('userId');
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/Client/${id}`);
        if (response.status === 200) {
          setUser(response.data.Client);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, [])

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      router.push('/login');
    }
  }, [router]);

  const handleUpdateProfile = () => {
    alert('Update Profile clicked');
  };

  const handleDeleteProfile = async (e) => {
    const id = localStorage.getItem('userId');
    e.preventDefault();
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_HOST}/Client/delete/${id}`); 
      if (response.status === 200 || response.status === 204) {
        alert('Profile deleted successfully');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        router.push('/');
      }
    } catch (error) {
      alert('Failed to delete profile:', error);
    }
  };
console.log(process.env.NEXT_PUBLIC_API_HOST)
  return (
    <div className="max-w-xl mx-auto p-8 bg-white ">
    <h2 className="text-3xl text-neutral-600 font-bold mb-6 text-center">User Profile</h2>
    <div className="mb-4">
      <label className="block text-gray-700">First Name:</label>
      <p className="text-gray-900">{user.prenomCl}</p>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Last Name:</label>
      <p className="text-gray-900">{user.nomCl}</p>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Address:</label>
      <p className="text-gray-900">{user.adresseCl}</p>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Phone Number:</label>
      <p className="text-gray-900">{user.telCl}</p>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Email:</label>
      <p className="text-gray-900">{user.emailCl}</p>
    </div>
    <div className="flex justify-center space-x-10 pt-4">
        <button
          onClick={handleUpdateProfile}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Profile
        </button>
        <button
          onClick={handleDeleteProfile}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete Profile
        </button>
      </div>
  </div>  )

};
export default Profile

