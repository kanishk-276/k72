import React from 'react'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useLocation } from 'react-router-dom'

const Stairs = (props) => {

  const pageRef = useRef(null)
  const currentPath = useLocation().pathname
  const stairParentRef = useRef(null)
  const tl = gsap.timeline()
  useGSAP(function(){

    tl.to(stairParentRef.current,{
        display:'block'
    },)

    tl.from(".stair",
      {
        height:0,
        stagger:{
          amount:-0.2
        }
      })
       tl.to('.stair',{
        y:'100%',
         stagger:{
          amount:-0.2
        }
      })
      tl.to(stairParentRef.current,{
        display:'none'  
      })
      tl.to('.stair',{
        y:'0%'
      })

      gsap.from(pageRef.current,{
        opacity:0,
        delay:1,
        scale:1.2
      })
  },[currentPath])


  return (
    <div>
   <div ref={stairParentRef} className='h-screen top-0 fixed z-20 w-full '>
       <div className='h-full flex w-full '>
      <div className='stair bg-black h-full w-1/5 '> </div>
      <div className='stair bg-black h-full w-1/5 '> </div>
      <div className='stair bg-black h-full w-1/5 '> </div>
      <div className='stair bg-black h-full w-1/5 '> </div>
      <div className='stair bg-black h-full w-1/5 '> </div>
    </div>
    </div>
  <div ref={pageRef}>
      {props.children}
  </div>
    </div>
  )
}

export default Stairs
