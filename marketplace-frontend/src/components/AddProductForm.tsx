'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { registerProduct } from '@/redux/product/productSlice';

export const AddProductForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const [productCode, setProductCode] = useState('');
  const [productName, setProductName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [availableStock, setAvailableStock] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    dispatch(registerProduct({
      sellerId: user.id,
      productData: {
        productCode,
        productName,
        shortDescription,
        price,
        availableStock,
      },
    }));

    setProductCode('');
    setProductName('');
    setShortDescription('');
    setPrice(0);
    setAvailableStock(0);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded shadow-sm bg-white space-y-4">
      <h2 className="text-lg font-semibold">Add New Product</h2>
      <input
        type="text"
        placeholder="Product Code"
        className="w-full px-3 py-2 border rounded"
        value={productCode}
        onChange={(e) => setProductCode(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Product Name"
        className="w-full px-3 py-2 border rounded"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Short Description"
        className="w-full px-3 py-2 border rounded"
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
        maxLength={100}
        required
      />
      <input
        type="number"
        placeholder="Price"
        className="w-full px-3 py-2 border rounded"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        required
      />
      <input
        type="number"
        placeholder="Available Stock"
        className="w-full px-3 py-2 border rounded"
        value={availableStock}
        onChange={(e) => setAvailableStock(Number(e.target.value))}
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add Product
      </button>
    </form>
  );
};
