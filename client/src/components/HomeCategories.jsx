import React from 'react'
import HomeApple from './HomeApple'
import HomeSamsung from './HomeSamsung'
import HomeAccessories from './HomeAccessories'
import HomeTablets from './HomeTablets'
import OurValues from './OurValues'
import Hero from './Hero'
import NewArrivals from './NewArrivals'
import Categories from './Categories'
import Faq from './Faq'
import Contact from './Contact'

const HomeCategories = () => {
  return (
    <div className='px-4 md:px-6 lg:px-10 py-8 space-y-12'>
      <Hero />
      <Categories />
      <NewArrivals />
      <HomeApple />
      <HomeSamsung />
      <HomeTablets />
      <HomeAccessories />
      <Contact />
      <OurValues />
      <Faq />
    </div>
  )
}

export default HomeCategories
