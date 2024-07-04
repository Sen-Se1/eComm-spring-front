"use client"
import Image from "next/image";
import axios from 'axios';

const Card = ({ product }) => {
  const idArt = product.idArt;
  
  const handleAdd = async () => {
    const id = localStorage.getItem('userId');
    const data = {
      idClient: id,
      idArticle: idArt
    }
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/Commands/addPTC`, data);
      if (response.status === 200) {
        alert("added successfully")
      }
    } catch (error) {
      console.error('Failed to add item:', error);
    }
  };
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden max-w-xs m-4">
      <div className="w-full h-64 bg-gray-200">
        {product.imgArt && (
          <Image
            src={product.imgArt}
            alt={product.nomArt}
            layout="responsive"
            width={300}
            height={300}
          />
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{product.nomArt}</h2>
        <p className="text-gray-700 mb-4">{product.desArt}</p>
        <p className="text-lg font-semibold">${product.puartArt}</p>
      </div>
      <div className="p-4 text-center">
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Card;
