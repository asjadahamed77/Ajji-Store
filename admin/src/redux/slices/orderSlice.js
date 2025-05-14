import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../api/api";
import toast from "react-hot-toast";

// Initial state
const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};



// Get order by ID
export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/orders/${orderId}`,
        { withCredentials: true,
          headers: {
  
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
         }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch order."
      );
    }
  }
);

// Get user's orders
export const getUserOrders = createAsyncThunk(
  "order/getUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/orders/admin/orders`,
        { withCredentials: true,
          headers: {
  
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
         }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders."
      );
    }
  }
);

// Update order to paid
export const updateOrderToPaid = createAsyncThunk(
  "order/updateOrderToPaid",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/orders/${orderId}/pay`,
        {},
        { withCredentials: true,
          headers: {
  
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
         }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update order payment status."
      );
    }
  }
);

// Update order to delivered
export const updateOrderToDelivered = createAsyncThunk(
  "order/updateOrderToDelivered",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/orders/${orderId}/deliver`,
        {},
        { withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
         }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update order delivery status."
      );
    }
  }
);

// Update order to shipped
export const updateOrderToShipped = createAsyncThunk(
  "order/updateOrderToShipped",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/orders/${orderId}/ship`,
        {},
        { withCredentials: true,
          headers: {
  
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
         }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update order shipping status."
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
     
      // Get order by ID
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.order;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Get user's orders
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Update order to paid
      .addCase(updateOrderToPaid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderToPaid.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentOrder?._id === action.payload.order._id) {
          state.currentOrder = action.payload.order;
        }
        state.orders = state.orders.map(order => 
          order._id === action.payload.order._id ? action.payload.order : order
        );
        toast.success(action.payload.message);
      })
      .addCase(updateOrderToPaid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Update order to delivered
      .addCase(updateOrderToDelivered.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderToDelivered.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentOrder?._id === action.payload.order._id) {
          state.currentOrder = action.payload.order;
        }
        state.orders = state.orders.map(order => 
          order._id === action.payload.order._id ? action.payload.order : order
        );
        toast.success(action.payload.message);
      })
      .addCase(updateOrderToDelivered.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Update order to shipped
      .addCase(updateOrderToShipped.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderToShipped.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentOrder?._id === action.payload.order._id) {
          state.currentOrder = action.payload.order;
        }
        state.orders = state.orders.map(order => 
          order._id === action.payload.order._id ? action.payload.order : order
        );
        toast.success(action.payload.message);
      })
      .addCase(updateOrderToShipped.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer; 