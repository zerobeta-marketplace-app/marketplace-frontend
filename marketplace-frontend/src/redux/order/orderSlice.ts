// src/features/order/orderSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface OrderItem {
  productId: number;
  quantity: number;
  unitPrice: number;
}

interface Order {
  id: number;
  referenceNumber: string;
  buyerId: number;
  status: 'pending' | 'completed' | 'canceled';
  totalAmount: number;
  items: OrderItem[];
  createdAt: string;
}

interface OrderState {
  orders: Order[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

// Async thunk
export const fetchOrders = createAsyncThunk<Order[]>('order/fetchOrders', async () => {
  const response = await axios.get('/api/orders'); // Replace with actual backend API
  return response.data;
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<{ orders: Order[]; currentPage: number; totalPages: number }>) => {
      state.orders = action.payload.orders;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    clearOrders: (state) => {
      state.orders = [];
      state.currentPage = 1;
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load orders';
      });
  },
});

export const { setOrders, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
