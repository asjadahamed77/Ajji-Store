import React, { useState } from 'react';
import logo from '../assets/logo/AjjiStore.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, verifyEmail } from '../redux/slices/authSlice';
import { toast } from 'react-hot-toast';

const RegisterUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    phone: ''
  });

  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(''));

  const inputRefs = React.useRef([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(register(formData));
    if (register.fulfilled.match(result)) {
    
      setShowOtpPopup(true);
    }
  };

  const handleOtpInput = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d{1,6}$/.test(paste)) return;
    const pasteArray = paste.split('');
    const newOtp = [...otp];
    pasteArray.forEach((char, index) => {
      newOtp[index] = char;
    });
    setOtp(newOtp);
    const nextIndex = pasteArray.length < 6 ? pasteArray.length : 5;
    inputRefs.current[nextIndex]?.focus();
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join('');
    if (finalOtp.length !== 6) return alert("Please enter 6-digit OTP");

    const result = await dispatch(verifyEmail({ otp: finalOtp }));
    if (verifyEmail.fulfilled.match(result)) {
      setShowOtpPopup(false);
      navigate('/');
    } else {
      toast.error("Verification failed. Your account has been removed. Please register again.");
      navigate('/login');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='lg:w-[400px] w-[350px] flex flex-col backdrop-blur-[200px] rounded-[20px] shadow-lg px-4 py-6'>
        <h1 className='flex items-center gap-4 text-2xl font-semibold'>
          Register to <img src={logo} alt="Ajji-Store" className='w-28' />
        </h1>
        <form className='flex flex-col mt-8 gap-4' onSubmit={handleRegisterSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder='Your name...' className='bg-transparent shadow shadow-white rounded p-2' />
          <input type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder='Your username..' className='bg-transparent shadow shadow-white rounded p-2' />
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder='Your email...' className='bg-transparent shadow shadow-white rounded p-2' />
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder='Your password...' className='bg-transparent shadow shadow-white rounded p-2' />
          <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder='Your phone...' className='bg-transparent shadow shadow-white rounded p-2' />
          <button type='submit' disabled={loading} className={`text-sm bg-white rounded py-2 w-full text-blue-950 font-medium duration-300 ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-80 cursor-pointer'}`}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <hr className='mt-4 h-0.25 border-none bg-blue-300 rounded-full' />
        <p className='text-sm mt-4 text-blue-100'>
          Already have an account? <span onClick={() => navigate('/login')} className='font-medium hover:underline cursor-pointer'>Click here</span>
        </p>
      </div>

      {/* Email OTP Popup */}
      {showOtpPopup && (
        <div className="fixed inset-0  backdrop-blur-3xl flex items-center justify-center z-50">
          <div className="bg-transparent  p-6 rounded-lg shadow-lg w-[350px]">
            <h2 className="text-xl font-bold text-center mb-4">Email Verification</h2>
            <p className="text-sm text-center text-blue-100 mb-4">Enter the 6-digit OTP sent to your email.</p>
            <form onSubmit={handleOtpSubmit} className="flex flex-col items-center">
              <div className="grid grid-cols-6 gap-2" onPaste={handleOtpPaste}>
                {Array(6).fill(0).map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={otp[index]}
                    className="w-10 h-10 border text-center rounded"
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) => handleOtpInput(e, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    required
                  />
                ))}
              </div>
              <button type="submit" className="mt-4 bg-blue-900 text-white px-4 py-1 rounded hover:opacity-80">
                Verify Email
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterUser;
