import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import RegisterUser from "./authentication/RegisterUser";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Toaster } from "react-hot-toast";
import Login from "./authentication/Login";
import UserProfile from "./components/UserProfile";
import { useState } from "react";

function App() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/register-user" || location.pathname === "/login";

    const [showUserProfile,setShowUserProfile] = useState(false)

  return (
    <>
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
        {!isAuthPage && <TopBar />}
        {!isAuthPage && <Navbar setShowUserProfile={setShowUserProfile} />}
       {
        showUserProfile &&  <UserProfile showUserProfile={showUserProfile} setShowUserProfile={setShowUserProfile}  />
       }
        <Routes>
          <Route path="register-user" element={<RegisterUser />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
