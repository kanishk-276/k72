import { useGSAP } from '@gsap/react'
import React,{useRef} from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'

const Agence = () => {

    const images =[
      
    'https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/Olivier_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/Lawrence_480x640-480x640.jpg',
    "https://k72.ca/uploads/teamMembers/HugoJoseph_480x640-480x640.jpg",
    "https://k72.ca/uploads/teamMembers/ChantalG_480x640-480x640.jpg",
    "https://k72.ca/uploads/teamMembers/MyleneS_480x640-480x640.jpg",
    "https://k72.ca/uploads/teamMembers/SophieA_480x640-480x640.jpg",
    "https://k72.ca/uploads/teamMembers/Claire_480x640-480x640.jpg",
    "https://k72.ca/uploads/teamMembers/Michele_480X640-480x640.jpg",
    "https://k72.ca/uploads/teamMembers/MEL_480X640-480x640.jpg",
    "https://k72.ca/uploads/teamMembers/CAMILLE_480X640_2-480x640.jpg",
    "https://k72.ca/uploads/teamMembers/MAXIME_480X640_2-480x640.jpg",
    "https://k72.ca/uploads/teamMembers/MEGGIE_480X640_2-480x640.jpg",
    "https://k72.ca/uploads/teamMembers/joel_480X640_3-480x640.jpg"

  ]

  const imageDivRef = useRef(null)
  const imageRef = useRef(null)
  gsap.registerPlugin(ScrollTrigger)


  useGSAP(function(){
    gsap.to(imageDivRef.current,{
      scrollTrigger:{
        trigger:imageDivRef.current,
        start:'top 20%',
        end:'top -95%',
        pin:true,
        pinSpacing:true,
        pinReparent:true,
        pinType:'transform',
        scrub:1,
        anticipatePin:1,
        invalidateOnRefresh:true,
        onUpdate:(elem)=>{
          const imageIndex = Math.floor(elem.progress*(images.length-1))
          imageRef.current.src=images[imageIndex]
        }
      }
  })
  })



  return (
    <div>
   <div className="section1 py-1">
     <div className='font-[font2]'>
      <div ref={imageDivRef} className='h-[20vw] rounded-3xl w-[15vw] absolute top-56 left-[30vw]'>
        <img ref={imageRef} className='w-full h-full object-cover  rounded-3xl' src='https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg'/>
         </div>
    <div className='mt-[55vh]'>
    <h1 className=' relative text-[18vw] text-center uppercase leading-[15vw]'>Soxian7e <br/>Bouze</h1>
    </div>
    <div className=' relative pl-[40%] mt-20'>
      <p className='text-5xl'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Notre curiosité nourrit notre créativité. On reste humbles et on dit non aux gros egos, même le vôtre. Une marque est vivante. Elle a des valeurs, une personnalité, une histoire. Si on oublie ça, on peut faire de bons chiffres à court terme, mais on la tue à long terme. C'est pour ça qu'on s'engage à donner de la perspective, pour bâtir des marques influentes.</p>
    </div>
    </div>
   </div>
   <div className="section2 h-screen w-full">
  

</div>

   </div>
  )
}

export default Agence
