import React from 'react'
import logo from '../assets/logo/AjjiStore.png'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { clearAuthState, logout } from '../redux/slices/adminSlice';

const Navbar = () => {
  const dispatch = useDispatch()
const navigate = useNavigate()
  const logoutHandler = () => {
    dispatch(logout())
    dispatch(clearAuthState())
    navigate('/login')
  }

  return (
    <div className='flex items-center justify-between px-4 py-2 border-b'>
      <Link to={'/'}>
      <img src={logo} alt="Admin" className='w-32 sm:w-40' />
      </Link>
      <button onClick={logoutHandler} className='uppercase text-sm font-semibold bg-white text-blue-950 px-4 py-1.5 hover:opacity-75 duration-300 transition-all rounded-full '>LOGOUT</button>
    </div>
  )
}

export default Navbar
