import React from 'react'
import HomeApple from './HomeApple'
import HomeSamsung from './HomeSamsung'
import HomeAccessories from './HomeAccessories'
import HomeTablets from './HomeTablets'
import OurValues from './OurValues'
import Hero from './Hero'

const HomeCategories = () => {
  return (
    <div className='px-2 md:px-6 lg:px-10 py-8 space-y-12'>
      <Hero />
      <HomeApple />
      <HomeSamsung />
      <HomeTablets />
      <HomeAccessories />
      <OurValues />
    </div>
  )
}

export default HomeCategories
