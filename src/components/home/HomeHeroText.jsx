import React from 'react'
import Video from './Video'

const HomeHeroText = () => {
  return (
    <div  className=' font-[font1] uppercase text-[8vw] leading-[10vw] text-white text-center'>
      <div>L'étincelle</div>
  <div className="justify-center items-center flex flex-row">
  qui
<div className="rounded-full w-[17vw] h-[8vw] overflow-hidden">
    <Video className='rounded-full' />
  </div>
  génère
</div> 
      <div>
        <svg className=" -mt-[10vh] z-10 w-full h-96" viewBox="0 0 300 300">
    <path 
      d="M150,50 
         a80,20 2 1,0 0,200 
         a80,20 2 1,0 0,-180" 
      className="oval-path stroke-[#D3FD50]"/>
 </svg>
  <h1 className='-mt-[35vh]'>La  créativité</h1>
  </div>
    </div>
  );
}

export default HomeHeroText
