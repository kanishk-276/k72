import React from 'react'
import Video from '../components/home/Video'
import HomeHeroText from '../components/home/HomeHeroText'
import HomeBottomText from '../components/home/HomeBottomText'
import Navbar from '../components/common/Navigation/Navbar'


const Home = () => {

  return (
    <>
    <Navbar/>
    <div className='h-screen w-screen fixed'>
    <Video/>
    </div>
    <div className='h-screen w-screen relative flex flex-col justify-between pb-5 overflow-hidden'>
    <HomeHeroText/>
    <HomeBottomText/>
    </div>
      </>
  )
}

export default Home
