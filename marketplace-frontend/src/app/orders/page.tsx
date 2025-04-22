'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchOrders } from '@/redux/order/orderSlice';

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const { orders, loading, error, currentPage, totalPages } = useAppSelector(state => state.order);
  const { user } = useAppSelector(state => state.auth);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchOrders({ page, buyer: user.email }));
    }
  }, [dispatch, page, user]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {orders.length === 0 && !loading ? (
        <p>No orders found.</p>
      ) : (
        <>
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Reference</th>
                <th className="p-2">Status</th>
                <th className="p-2">Created At</th>
                <th className="p-2">Total Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-t">
                  <td className="p-2">{order.referenceNumber}</td>
                  <td className="p-2">{order.status}</td>
                  <td className="p-2">{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="p-2">{order.items.length}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-end mt-4 space-x-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(prev => prev - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(prev => prev + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </main>
  );
}
