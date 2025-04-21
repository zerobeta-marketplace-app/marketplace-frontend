'use client';

import React, { useState } from "react";
import { Product } from "../redux/product/productSlice";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/order/orderSlice";

interface MarketCardProps {
  product: Product;
}

export const MarketCard: React.FC<MarketCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const handleAddToCart = () => {
    if (quantity <= 0) return;

    dispatch(addToCart({ product, quantity }));

    setMessage("✅ Product added to cart!");
    setTimeout(() => setMessage(""), 2000); // Hide message after 2s
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm p-4 bg-white w-full relative">
      <h2 className="text-xl font-semibold mb-2 text-blue-700">
        {product.productName}
      </h2>

      <table className="w-full text-sm text-left text-gray-700 border-t border-gray-100 mb-4">
        <tbody>
          <tr><th className="py-2 font-medium">Product Code:</th><td>{product.productCode}</td></tr>
          <tr><th className="py-2 font-medium">Description:</th><td>{product.shortDescription}</td></tr>
          <tr><th className="py-2 font-medium">Price:</th><td>${product.price}</td></tr>
          <tr><th className="py-2 font-medium">Available Stock:</th><td>{product.availableStock}</td></tr>
          <tr><th className="py-2 font-medium">Seller Name:</th><td>{product.sellerName}</td></tr>
          <tr><th className="py-2 font-medium">Seller Country:</th><td>{product.sellerCountry}</td></tr>
        </tbody>
      </table>

      <div className="flex items-center gap-2 mb-3">
        <label className="text-sm font-medium">Quantity:</label>
        <input
          type="number"
          value={quantity}
          min={1}
          max={product.availableStock}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border px-2 py-1 rounded w-20"
        />
      </div>

      <button
        onClick={handleAddToCart}
        className="bg-green-600 text-white py-1 px-4 rounded hover:bg-green-700 w-full"
      >
        Add to Cart
      </button>

      {message && (
        <div className="mt-2 text-green-600 text-sm text-center">
          {message}
        </div>
      )}
    </div>
  );
};
