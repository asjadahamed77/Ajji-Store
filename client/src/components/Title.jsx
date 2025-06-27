import React from 'react'

const Title = ({title}) => {
  return (
   <div>
     <h1 className="font-arvo  w-fit text-2xl  md:text-4xl font-bold bg-gradient-to-r from-from to-to bg-clip-text text-transparent">
        {title}
    </h1>
    <p className='w-16 h-1 bg-white/65 rounded-r-4xl'></p>
   </div>
  )
}

export default Title
