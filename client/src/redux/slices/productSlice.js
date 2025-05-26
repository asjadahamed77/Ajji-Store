import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../api/api";
import toast from "react-hot-toast";

const initialState = {
  products: [],
  selectedProduct: null,
  singleProduct: null,
  newArrivals: [],
  appleProducts: [],
  samsungProducts: [],
  accessories: [],
  tabs: [],
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

// Get new arrivals
export const fetchNewArrivals = createAsyncThunk(
  "products/fetchNewArrivals",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/product/new-arrivals`);

      return data.newArrivals;
    
      
    } catch (error) {
      toast.error("Failed to load new arrivals");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
)

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

// Get Samsung Products
export const fetchSamsungProducts = createAsyncThunk(
  "products/fetchSamsungProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/product/brand/samsung`
      );

      return data.samsungProducts;
    } catch (error) {
      toast.error("Failed to load products by category");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get Accessory Products
export const fetchAccessories = createAsyncThunk(
  "products/fetchAccessories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/product/category/accessory`
      );
      return data.accessories;
    } catch (error) {
      toast.error("Failed to load products by category");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get Accessory Products
export const fetchTablets = createAsyncThunk(
  "products/fetchTablets",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/product/category/tab`
      );
      return data.ipadOrTablets;
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

      // New Arrivals
      .addCase(fetchNewArrivals.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.newArrivals = [];
      })
      .addCase(fetchNewArrivals.fulfilled, (state, action) => {
        state.loading = false;
        state.newArrivals = action.payload;
      })
      .addCase(fetchNewArrivals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.newArrivals = [];
        toast.error(action.payload || "Failed to fetch new arrivals");
      })

      // Apple Products
      .addCase(fetchAppleProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.appleProducts = null;
      })
      .addCase(fetchAppleProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.appleProducts = action.payload;
      })
      .addCase(fetchAppleProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.appleProducts = null;
        toast.error(action.payload || "Failed to fetch product");
      })
      // Samsung Products
      .addCase(fetchSamsungProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.samsungProducts = null;
      })
      .addCase(fetchSamsungProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.samsungProducts = action.payload;
      })
      .addCase(fetchSamsungProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.samsungProducts = null;
        toast.error(action.payload || "Failed to fetch product");
      })
       // Accessory Products
       .addCase(fetchAccessories.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.accessories = null;
      })
      .addCase(fetchAccessories.fulfilled, (state, action) => {
        state.loading = false;
        state.accessories = action.payload;
      })
      .addCase(fetchAccessories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.accessories = null;
        toast.error(action.payload || "Failed to fetch product");
      })
       // Fetch Products
       .addCase(fetchTablets.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.tabs = null;
      })
      .addCase(fetchTablets.fulfilled, (state, action) => {
        state.loading = false;
        state.tabs = action.payload;
      })
      .addCase(fetchTablets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.tabs = null;
        toast.error(action.payload || "Failed to fetch product");
      })
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
