import React, { useEffect } from 'react'
import HomeCategories from '../components/HomeCategories'
import { useDispatch } from 'react-redux'
import { autheticated } from '../redux/slices/authSlice'


const Home = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
   dispatch(autheticated())
  },[dispatch])
  return (
    <div>

      <HomeCategories />
    </div>
  )
}

export default Home
