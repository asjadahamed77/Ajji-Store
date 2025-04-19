import React, { useEffect, useState } from 'react'
import hero1 from '../assets/hero/hero.jpg'
import hero2 from '../assets/hero/hero1.jpg'
import hero3 from '../assets/hero/hero2.jpeg'

const heroImages = [hero1, hero2, hero3]

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % heroImages.length
      )
    }, 3000)

    return () => clearInterval(interval) // Cleanup
  }, [])

  return (
    <div className='relative w-full h-[70vh] mt-2 overflow-hidden'>
      <img
        src={heroImages[currentImageIndex]}
        alt="AjjiStore Hero"
        className='w-full h-full object-cover transition-opacity duration-1000'
      />

      {/* Overlay */}
      <div className='absolute inset-0 bg-black/60'></div>

      {/* Centered Text */}
      <div className='absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>
          Welcome to AjjiStore
        </h1>
        <p className='text-lg md:text-xl mb-6'>
          Your one-stop tech destination – phones, laptops, and more!
        </p>
        <button className='bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition'>
          Shop Now
        </button>
      </div>
    </div>
  )
}

export default Hero
