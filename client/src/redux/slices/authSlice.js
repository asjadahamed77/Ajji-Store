import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../api/api";
import toast from "react-hot-toast";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  user: userInfoFromStorage || null,
  userData: null,
  loading: false,
  error: null,
  successMessage: null,
};

// REGISTER
export const register = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/register`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (data.success) {
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        localStorage.setItem("userToken", data.token);
        return data
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

// VERIFY EMAIL
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async ({ otp }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/verify-email`,
        { otp },
        { withCredentials: true, headers: {
          'Content-Type': 'application/json',
        } }
      );

      if (data.success) {
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        return { data, message: data.message };
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Verification failed");
    }
  }
);

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/login`, userData, {
        withCredentials: true,
      });
      if (data.success) {
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        return data;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// LOGOUT
export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await axios.post(`${backendUrl}/api/auth/logout`, {}, { withCredentials: true });
    localStorage.removeItem("userInfo");
    return true;
  } catch (error) {
    return rejectWithValue("Logout failed");
  }
});

// SLICE
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    resetUserData: (state) => {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.userData = action.payload.userData;
        toast.success(action.payload.message);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // VERIFY EMAIL
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.user = action.payload.user;
      
        toast.success(action.payload.message);
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.successMessage = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
        state.successMessage = null;
        toast.success("Logged out successfully");
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { clearAuthState, resetUserData } = authSlice.actions;
export default authSlice.reducer;
