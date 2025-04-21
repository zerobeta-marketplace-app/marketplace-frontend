'use client';

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { placeOrder, removeFromCart } from "@/redux/order/orderSlice";

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(state => state.order);

  const handlePlaceOrder = () => {
    dispatch(placeOrder(cart));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">🛒 Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="mb-4">
            {cart.map(item => (
              <li key={item.product.id} className="mb-2 flex justify-between">
                <div>
                  {item.product.productName} - {item.quantity} × ${item.product.price}
                </div>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => dispatch(removeFromCart(item.product.id))}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handlePlaceOrder}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Confirm & Place Order
          </button>
        </div>
      )}
    </div>
  );
}
