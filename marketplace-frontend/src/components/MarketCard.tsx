// src/components/MarketCard.tsx
'use client';

import { Product } from "../redux/product/productSlice";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/order/orderSlice";

interface MarketCardProps {
  product: Product;
}

export const MarketCard: React.FC<MarketCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm p-4 bg-white w-full">
      <h2 className="text-xl font-semibold mb-2 text-blue-700">{product.productName}</h2>

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

      <button
        onClick={handleAddToCart}
        className="bg-green-600 text-white py-1 px-4 rounded hover:bg-green-700 w-full"
      >
        Add to Cart
      </button>
    </div>
  );
};
