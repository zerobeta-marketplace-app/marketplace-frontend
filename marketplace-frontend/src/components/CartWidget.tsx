'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export const CartWidget = () => {
  const cart = useSelector((state: RootState) => state.order.cart);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed top-4 right-4 z-50 bg-white shadow-lg px-4 py-2 rounded border border-gray-200">
      <Link href="/cart" className="text-blue-600 font-medium hover:underline">
        🛒 Cart ({itemCount})
      </Link>
    </div>
  );
};
