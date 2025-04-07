import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import { useEffect } from "react";

// This component handles redirect if no token
const ProtectedRoute = ({ children }) => {
  const adminToken = localStorage.getItem("adminToken");

  if (!adminToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const adminToken = localStorage.getItem("adminToken");

  return (
    <Provider store={store}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#010b16",
            color: "#fff",
          },
        }}
      />

     

      <Routes>
        <Route path="/login" element={<Login />} />

      
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navbar />
              <div>Dashboard or Home Page</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Provider>
  );
}

export default App;
