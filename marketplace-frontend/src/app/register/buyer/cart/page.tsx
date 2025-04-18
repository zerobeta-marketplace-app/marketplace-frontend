'use client';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { updateQuantity, removeFromCart, CartItem } from '../../../../redux/cart/cartSlice';
import { useRouter } from 'next/navigation';
import React from 'react';

const CartPage = () => {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const totalAmount = items.reduce((acc : number, item : CartItem) => acc + item.price * item.quantity, 0);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemove = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = () => {
    alert('Checkout is not implemented yet.');
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {items.map((item: CartItem) => (
            <div key={item.id} className="flex justify-between items-center border p-4 rounded">
              <div>
            <h2 className="font-semibold">{item.productName}</h2>
            <p className="text-sm text-gray-500">Price: ${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-4">
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
              className="w-16 border px-2 py-1 rounded"
            />
            <span className="text-sm font-medium">
              ${Number(item.price * item.quantity).toFixed(2)}
            </span>
            <button
              className="text-red-500 hover:underline"
              onClick={() => handleRemove(item.id)}
            >
              Remove
            </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-6 border-t mt-6">
            <h2 className="text-xl font-bold">Total: ${totalAmount.toFixed(2)}</h2>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
