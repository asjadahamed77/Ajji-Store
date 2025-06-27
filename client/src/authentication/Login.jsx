import React, { useState } from 'react';
import logo from '../assets/logo/AjjiStore.png';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  // Use state to manage form data
  const [formData, setFormData] = useState({
    identifier: '', // can be username or email
    password: '',
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(login(formData));

    if (login.fulfilled.match(result)) {
      navigate("/");
   
      setFormData({
        identifier: '',
        password: '',
      });
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='lg:w-[400px] w-[350px] flex flex-col backdrop-blur-[200px] rounded-[20px] shadow-lg px-4 py-6'>
        <h1 className='flex items-center gap-4 text-2xl font-semibold'>
          Login to <img src={logo} alt="Ajji-Store" className='w-28' />
        </h1>
        <form className='flex flex-col mt-8 gap-4' onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="identifier" 
            value={formData.identifier} 
            onChange={handleInputChange} 
            placeholder='Email or Username...' 
            className='bg-transparent shadow shadow-white rounded p-2' 
            required
          />
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleInputChange} 
            placeholder='Your password...' 
            className='bg-transparent shadow shadow-white rounded p-2' 
            required
          />
          <button 
            type='submit' 
            disabled={loading}
            className={`text-sm bg-white rounded py-2 w-full text-blue-950 font-medium duration-300 
              ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-80 cursor-pointer'}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <hr className='mt-4 h-0.25 border-none bg-blue-300 rounded-full' />
        <p className='text-sm mt-4 text-blue-100'>
          Don’t have an account?{" "}
          <span 
            onClick={() => navigate('/register-user')} 
            className='font-medium hover:underline cursor-pointer'
          >
            Create new
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
