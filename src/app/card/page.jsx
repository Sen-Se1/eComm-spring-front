"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const WhichlistPage = () => {
  const router = useRouter();

  const [wishlist, setWishlist] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    const fetchProfile = async () => {
      const id = localStorage.getItem('userId');
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/Commands/user/${id}`);
        if (response.status === 200) {
          setWishlist(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch Commands:', error);
      }
    };

    fetchProfile();
  }, [])

  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = wishlist.reduce((sum, item) => sum + item.puartArt, 0);
      setTotal(totalAmount);
    };

    calculateTotal();
  }, [wishlist]);

  const handleDelete = async (idArt) => {
    const id = localStorage.getItem('userId');
    const data = {
      idClient: id,
      idArticle: idArt
    }
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_HOST}/Commands/deleteFC`, {data: data});
      if (response.status === 200) {
        setWishlist(wishlist.filter((item) => item.idArt !== idArt));
      }
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const handleDeleteAll = async () => {
    const id = localStorage.getItem('userId');

    const data = {
      idClient: id
    }
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_HOST}/Commands/deleteAllProduct`, {data: data});
      if (response.status === 200) {
        setWishlist([]);
      }
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
    
  };
  
  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white dark:bg-neutral-800 ">
        <thead>
          <tr className="w-full bg-neutral-200 dark:bg-neutral-600 text-rose-50">
            <th className="py-2 px-4 border-b">Item</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {wishlist.map(({ idArt, nomArt, puartArt }) => (
            <tr className="text-purple-300" key={idArt}>
              <td className="py-2 px-4 text-center border-b">{nomArt}</td>
              <td className="py-2 px-4 text-center border-b">${puartArt}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleDelete(idArt)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr className="text-purple-300">
            <td className="py-2 px-4 text-center border-b">TOTAL</td>
            <td className="py-2 px-4 text-center border-b">${total}</td>
            <td className="py-2 px-4 border-b text-center">
              <button
                onClick={handleDeleteAll}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                Delete All
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WhichlistPage;
