'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchAllProducts  } from '../../../redux/product/productSlice';
import { MarketCard } from '@/components/MarketCard';
import Link from 'next/link';

export default function BuyerProductPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(fetchAllProducts ());
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Products on Sale</h1>
      <div className="flex justify-end mt-4">
        <Link href="/orders" className="text-blue-600 underline">
          📦 View My Orders
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <MarketCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
