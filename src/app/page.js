// page.js
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Card from "@/components/card/card";


export default function Home() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/Articles`);
        if (response.status === 200) {
          setProducts(response.data.Result);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProfile();
  }, [])

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-neutral-700 text-center mb-8">Product Listing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </div>
    </div>
  );
}
