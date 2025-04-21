'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchSellerProducts } from '@/redux/product/productSlice';
import { ProductCard } from '@/components/ProductCard';
import { AddProductForm } from '@/components/AddProductForm';

export default function SellerProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.product);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchSellerProducts(user.id));
    }
  }, [user]);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Your Products</h1>

      <AddProductForm />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
