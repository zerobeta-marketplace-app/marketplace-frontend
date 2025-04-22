'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { checkoutOrder } from '@/redux/order/orderSlice';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { cart, loading, error } = useAppSelector(state => state.order);

  const handleCheckout = async () => {
    const result = await dispatch(checkoutOrder());

    if (checkoutOrder.fulfilled.match(result)) {
      alert(` Order placed successfully. Ref: ${result.payload.referenceNumber}`);
      router.push('/orders');
    } else {
      alert(` ${result.payload}`);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul className="divide-y">
            {cart.map((item, index) => (
              <li key={index} className="py-4">
                {item.product.productName} x {item.quantity} = ${item.quantity * item.product.price}
              </li>
            ))}
          </ul>
          <button
            onClick={handleCheckout}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Placing Order...' : 'Checkout'}
          </button>
        </>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
