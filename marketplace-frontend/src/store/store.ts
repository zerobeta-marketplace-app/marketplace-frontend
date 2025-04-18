import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/user/authSlice';
import userReducer from '@/redux/user/userSlice';
import productReducer from '@/redux/product/productSlice';
import orderReducer from '@/redux/order/orderSlice';
import cartReducer from '@/redux/cart/cartSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    order: orderReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
