
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../api/api";
import toast from "react-hot-toast";

const initialState = {  
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
  };

  export const fetchProductsByCategory = createAsyncThunk(
    "products/fetchByCategory",
    async (category, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${backendUrl}/api/product/${category.toString()}`);
        return response.data.products;
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
        });
    },
  });
  
  export const { clearSelectedProduct } = productSlice.actions;
  export default productSlice.reducer;
  
  