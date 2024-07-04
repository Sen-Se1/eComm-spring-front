"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
  const router = useRouter();

  const [command, setCommand] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${process.env.API_HOST}/Client`);
        if (response.status === 200) {
          setCommand(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch Commands:", error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = command.reduce((sum, item) => {
        if (item.commandes[0] && item.commandes[0].articles) {
          return (
            sum +
            item.commandes[0].articles.reduce(
              (articleSum, article) => articleSum + article.puartArt,
              0
            )
          );
        }
        return sum;
      }, 0);
      setTotal(totalAmount);
    };

    calculateTotal();
  }, [command]);

  const handleDelete = async (id) => {
    const data = {
      idClient: id,
    };
    try {
      const response = await axios.delete(
        `${process.env.API_HOST}/Commands/deleteAllProduct`,
        { data: data }
      );
      if (response.status === 200) {
        setCommand(command.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white dark:bg-neutral-800">
        <thead>
          <tr className="w-full bg-neutral-200 dark:bg-neutral-600 text-rose-50">
            <th className="py-2 px-4 border-b">Id Client</th>
            <th className="py-2 px-4 border-b">Id Command</th>
            <th className="py-2 px-4 border-b">Products</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {command.map(
            (item) =>
              item.commandes[0] &&
              item.commandes[0].articles &&
              item.commandes[0].articles.length > 0 && (
                <tr className="text-purple-300" key={item.id}>
                  <td className="py-2 px-4 text-center border-b">{item.id}</td>
                  <td className="py-2 px-4 text-center border-b">
                    {item.commandes[0] ? item.commandes[0].id : "N/A"}
                  </td>
                  <td className="py-2 px-4 text-center border-b">
                    {item.commandes[0].articles.map((i) => (
                      <span key={i.id}>{i.nomArt} | </span>
                    ))}
                  </td>
                  <td className="py-2 px-4 text-center border-b">
                    {item.commandes[0].articles.reduce(
                      (sum, article) => sum + article.puartArt,
                      0
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
          )}
          <tr className="text-purple-300">
            <td className="py-2 px-4 text-center border-b">TOTAL</td>
            <td className="py-2 px-4 text-center border-b" colSpan={4}>
              ${total}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Page;
