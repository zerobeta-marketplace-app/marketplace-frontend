// src/features/product/productSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export interface Product {

  id: number;
  productCode: string;
  productName: string;
  shortDescription: string;
  price: number;
  availableStock: number;
  sellerCountry?: string;
  sellerName?: string;
}

export interface buyersProducts {
  id: number;
  productCode: string;
  productName: string;
  shortDescription: string;
  price: number;
  availableStock: number;
  sellerName: string;
  sellerCountry: string;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchAllProducts  = createAsyncThunk<Product[]>(
  'product/fetchAllProducts ',
  async () => {
    //const response = await axios.get(`${process.env.NEXT_PUBLIC_PRODUCT_API_BASE_URL}/products`); 
    const response = await axios.get(`http://localhost:3002/products`);
    console.log('All products:', response.data);
    return response.data;
  }
);

export const fetchSellerProducts = createAsyncThunk<Product[], number>(
  'product/fetchSellerProducts',
  async (sellerId) => {
    const response = await axios.get(`http://localhost:3002/products/seller/${sellerId}`);
    console.log('Seller products:', response.data);
    return response.data;
  }
);

export const registerProduct = createAsyncThunk<Product, { sellerId: number; productData: Omit<Product, 'id'> }>(
  'product/registerProduct',
  async ({ sellerId, productData }) => {
    const response = await axios.post(`http://localhost:3002/products/${sellerId}`, productData);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    clearProducts: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts .pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts .fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts .rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchSellerProducts.fulfilled, (state: ProductState, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
      })
      .addCase(registerProduct.fulfilled, (state: ProductState, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
      });
  },
});

export const { setProducts, clearProducts } = productSlice.actions;
export default productSlice.reducer;
