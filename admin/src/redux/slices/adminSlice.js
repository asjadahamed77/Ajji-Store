import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../api/api";
import toast from "react-hot-toast";



const initialState = {
  admin: null,
  loading: false,
  products: [],
  error: null,
  successMessage: null,
};

// LOGIN
export const login = createAsyncThunk(
  "admin/login",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/login`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (data.success) {
        localStorage.setItem("adminToken", data.admintoken);
        return data;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// ADD PRODUCT
export const addProduct = createAsyncThunk(
  "admin/addProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/product/add`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (data.success) {
        return data;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add product.");
    }
  }
);

// VIEW PRODUCT
export const viewProduct = createAsyncThunk(
  "admin/viewProduct",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/product/all`, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (data.success) {
        return data;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to view product.");
    }
  }
);
// Delete product
export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/admin/product/${productId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (data.success) {
        return { id: productId }; 
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete product.");
    }
  }
);


const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    logout: (state) => {
      state.admin = null;
      state.loading = false;
      state.error = null;
      state.successMessage = null;
      localStorage.removeItem("adminToken");
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.user;
        state.successMessage = "Login successful";
        toast.success("Login successful");
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // ADD PRODUCT
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload.product); 
        state.successMessage = "Product Added";
        toast.success("Product added successfully");
        
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // VIEW PRODUCT
      .addCase(viewProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(viewProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products; 
        state.successMessage = "Products fetched successfully";
      })
      .addCase(viewProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
         // DELETE PRODUCT
         .addCase(deleteProduct.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
          state.loading = false;
          state.products = state.products.filter(product => product._id !== action.payload.id);
          toast.success("Product deleted successfully");
        })
        .addCase(deleteProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload);
        });
  },
});

export const { clearAuthState, logout } = adminSlice.actions;
export default adminSlice.reducer;
