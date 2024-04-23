"use client"

import { useState } from 'react';
import axios from 'axios';
import Image from "next/image";

const Sell = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    sellerdetail:''
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/products', product);
      console.log('Product added:', response.data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 py-6 w-1/3 md:w-1/2 lg:w-1/3">
        <h1 className="head-text text-primary font-bold text-center mb-0">
          Sell<span className="text-primary mb-4"> Product</span>
        </h1>
        <div className="items-center">
          <Image
            src="/assets/icons/hand-drawn-arrow.svg"
            alt="arrow"
            width={150}
            height={175}
            className="max-xl:hidden mb-4 left-1/2 items-center bottom-0 z-0"
          />
        </div>
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Product title"
              value={product.title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          

          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              placeholder="Product Description"
              value={product.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
              Product price
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="product price"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imageurl" className="block text-gray-700 font-bold mb-2">
              Image
            </label>
            <input
              type="text"
              name="imageUrl"
              value={product.imageUrl}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="imageurl"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="sellerdetail" className="block text-gray-700 font-bold mb-2">
              Seller Info
            </label>
            <input
              type="text"
              name="sellerdetail"
              value={product.sellerdetail}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Seller full information"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="bg-white-500 hover:text-red-700 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={buttonDisabled}
            >
              {loading ? "Processing" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>


  );
};

export default Sell;