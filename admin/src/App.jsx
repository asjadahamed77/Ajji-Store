import { Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import store from "./redux/store";

import Login from "./pages/Login";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import ViewProduct from "./pages/ViewProduct";
import Orders from "./pages/Orders";
import DashboardLayout from "./layout/DashboardLayout";


// Auth protection
const ProtectedRoute = ({ children }) => {
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <Provider store={store}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#010b16",
            color: "#fff",
          },
        }}
      />

      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes with layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="view-product" element={<ViewProduct />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
