import React from 'react'
import Video from './Video'

const HomeHeroText = () => {
  return (
    <div  className=' font-[font1] uppercase text-[8vw] leading-[10vw] text-white text-center'>
      <div>L'étincelle</div>
      <div className='justify-center items-center flex flex-row'>qui<div className= 'rounded-full w-[17vw] h-[8vw]  overflow-hidden'><Video/></div>génère</div>
      <div>la créativité</div>
    </div>
  );
}

export default HomeHeroText
