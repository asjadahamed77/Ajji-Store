import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../api/api";
import toast from "react-hot-toast";

const initialState = {
  products: [],
  selectedProduct: null,
  singleProduct: null,
  appleProducts: [],
  loading: false,
  error: null,
};

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/product/${category.toString()}`
      );
      return response.data.products;
    } catch (error) {
      toast.error("Failed to load products by category");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get single product
export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/product/product/${productId}`
      );

      if (data.success) {
        return data.product;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product."
      );
    }
  }
);

// Get Apple Products
export const fetchAppleProducts = createAsyncThunk(
  "products/fetchAppleProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/product/brand/apple`);

      return data.appleProducts;
    } catch (error) {
      toast.error("Failed to load products by category");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // GET SINGLE PRODUCT
      .addCase(getSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.singleProduct = null;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.singleProduct = null;
        toast.error(action.payload || "Failed to fetch product");
      })
      // Apple Products
      .addCase(fetchAppleProducts.pending, (state) => {
        state.loading = [];
        state.error = null;
        state.appleProducts = null;
      })
      .addCase(fetchAppleProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.appleProducts = action.payload;
      })
      .addCase(fetchAppleProducts.rejected, (state, action) => {
        state.loading = [];
        state.error = action.payload;
        state.appleProducts = null;
        toast.error(action.payload || "Failed to fetch product");
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
