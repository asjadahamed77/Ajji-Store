import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import RegisterUser from "./authentication/RegisterUser";
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
  const location = useLocation();

  
  const isAuthPage = location.pathname === '/register-user' || location.pathname === '/login';

  return (
    <>
    <Provider store={store}>
      {!isAuthPage && <TopBar />}
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="register-user" element={<RegisterUser />} />
      
      </Routes>
      </Provider>
    </>
  );
}

export default App;
