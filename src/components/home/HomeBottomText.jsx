import React from 'react'
import { Link } from 'react-router-dom' 

const HomeBottomText = () => {
  return (
    <div className='font-[font2] text-[6.5vw] uppercase   text-white text-2xl flex items-center justify-center gap-10'>
      <Link className='border-2 rounded-full pr-5 pl-5 hover:text-[#D3FD50]' to='/projects'>Projects</Link>
      <Link className='border-2 rounded-full pr-5 pl-5 hover:text-[#D3FD50]' to='/agence'>Agence</Link>
    </div>
  )
}

export default HomeBottomText
