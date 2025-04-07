import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../api/api";
import toast from "react-hot-toast";

const initialState = {
  admin: null,
  loading: false,
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



// SLICE
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

  },
});

export const { clearAuthState, logout } = adminSlice.actions;
export default adminSlice.reducer;
