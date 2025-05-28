import React, { useState, useEffect } from 'react'
import hero1 from '../assets/hero/apple-1.jpg'
import hero2 from '../assets/hero/apple-2.jpg'
import hero3 from '../assets/hero/apple-3.jpg'

const Hero = () => {
  const images = [hero1, hero2, hero3]
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='relative w-full h-[60vh]   lg:h-[80vh]'>
      <img
        src={images[currentIndex]}
        alt="Hero Image"
        className='w-full h-full absolute inset-0 object-cover rounded-3xl'
      />
      <div className='absolute inset-0 bg-black/50 flex flex-col justify-center sm:items-start xl:pl-32 md:pl-16 sm:pl-8 px-4'>
        <h1 className="w-fit text-2xl lg:text-6xl sm:text-4xl font-bold bg-gradient-to-l from-blue-200 to-blue-400 text-shadow-xs bg-clip-text text-transparent">
          Your one-stop Mobile Store
        </h1>
        <p className='md:text-lg text-sm lg:max-w-[600px] mt-4 text-blue-200'>
          Discover the latest smartphones and accessories with fast delivery, secure payments, and a smooth shopping experience.
        </p>
        <div className='flex w-fit items-center justify-self-start gap-4 mt-6'>
          <a href='#shop' className='text-xs sm:text-sm md:text-base px-8 py-2 border-2 bg-gradient-to-b from-blue-400 to-blue-800 rounded-lg hover:opacity-80 cursor-pointer transition-all duration-300 '>
            Shop Now
          </a>
          <a href='#shop' className='text-xs sm:text-sm md:text-base px-8 py-2 bg-transparent  border-2 rounded-lg hover:opacity-80 cursor-pointer transition-all duration-300 '>
            Learn More
          </a>
        </div>
      </div>
    </div>
  )
}

export default Hero
