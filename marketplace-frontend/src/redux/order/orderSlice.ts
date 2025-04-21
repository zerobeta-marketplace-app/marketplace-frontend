// src/features/order/orderSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../product/productSlice';
import { RootState } from './../../store/store';

interface CartItem {
  product: Product;
  quantity: number;
}

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
  cart: CartItem[];
  orders: Order[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  cart: [],
  orders: [],
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

// 🧾 Place order thunk
export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (cart: CartItem[]) => {
    const payload = {
      items: cart.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        unitPrice: item.product.price,
      })),
    };
    const response = await axios.post(`${process.env.NEXT_PUBLIC_ORDER_API_BASE_URL}/orders`, payload);
    return response.data;
  }
);

export const checkoutOrder = createAsyncThunk(
  'order/checkout',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { cart } = state.order;
    const { user } = state.auth;

    if (!user?.email) return rejectWithValue("User email not found");

    const orderItems = cart.map(item => ({
      productId: item.product.id,
      productName: item.product.productName,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const orderPayload = {
      buyerEmail: user.email,
      items: orderItems,
    };

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_ORDER_API_BASE_URL}/orders`, orderPayload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Checkout failed");
    }
  }
);

// 📦 Fetch orders for logged in buyer
export const fetchOrders = createAsyncThunk<Order[]>('order/fetchOrders', async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_ORDER_API_BASE_URL}/orders`);
  return response.data;
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      console.log('Adding to cart:', action.payload);
      const existing = state.cart.find(c => c.product.id === action.payload.product.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(item => item.product.id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
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
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = [];
        state.orders.push(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to place order';
      })
      .addCase(checkoutOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkoutOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = []; // clear cart after successful checkout
      })
      .addCase(checkoutOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
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

export const {
  addToCart,
  removeFromCart,
  clearCart,
  setOrders,
  clearOrders,
} = orderSlice.actions;

export default orderSlice.reducer;
